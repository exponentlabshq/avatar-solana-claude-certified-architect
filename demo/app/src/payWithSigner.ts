import { Mppx, solana } from '@solana/mpp/client'
import type { TransactionSigner } from '@solana/signers'
import type { Step } from './wallet.js'

type ProgressEvent =
  | { type: 'challenge'; recipient: string; amount: string; currency: string; spl?: string; feePayerKey?: string }
  | { type: 'signing' }
  | { type: 'signed'; transaction: string }
  | { type: 'paying' }
  | { type: 'confirming'; signature: string }
  | { type: 'paid'; signature: string }

/** Only a few retries — each retry re-opens Phantom; too many feels “broken”. */
const MAX_BLOCKHASH_RETRIES = 3

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

/**
 * Only true **stale blockhash** cases should retry. Do **not** retry on RPC 429 / rate limits /
 * generic simulation errors — those caused endless re-sign loops when “simulation failed” matched broadly.
 */
function isBlockhashVerificationFailure(status: number, body: unknown): boolean {
  if (status !== 402) return false
  const text =
    typeof body === 'string'
      ? body
      : body !== null && typeof body === 'object'
        ? JSON.stringify(body)
        : ''
  if (!text) return false
  if (/429|rate limit|too many requests|Too Many Requests/i.test(text)) return false
  return (
    /blockhash|Blockhash/i.test(text) &&
    /not found|expired|too old/i.test(text)
  )
}

/**
 * Same 402 → pay → retry flow as {@link payAndFetch}, but with an explicit Kit signer (e.g. Phantom bridge).
 * Retries the full MPP fetch when the server rejects with a stale blockhash (common if Phantom stayed open too long).
 */
export async function* payAndFetchWithSigner(
  url: string,
  signer: TransactionSigner,
  /** If omitted, the charge client uses the 402 challenge’s `network` (same cluster as the server). */
  rpcUrl?: string,
): AsyncGenerator<Step> {
  yield { type: 'request', url }

  for (let attempt = 0; attempt < MAX_BLOCKHASH_RETRIES; attempt++) {
    if (attempt > 0) {
      await sleep(1200 + attempt * 400)
      yield { type: 'request', url }
    }

    const steps: Step[] = []
    let resolve: (() => void) | null = null

    const progressCallback: ((event: ProgressEvent) => void) | null = (event) => {
      let step: Step
      switch (event.type) {
        case 'challenge':
          step = {
            type: 'challenge',
            amount: event.amount,
            recipient: event.recipient,
            currency: event.currency,
            feePayerKey: event.feePayerKey,
          }
          break
        case 'signing':
          step = { type: 'signing' }
          break
        case 'signed':
          return
        case 'paying':
          step = { type: 'paying' }
          break
        case 'confirming':
          step = { type: 'confirming', signature: event.signature }
          break
        case 'paid':
          step = { type: 'paid', signature: event.signature }
          break
      }
      steps.push(step)
      resolve?.()
    }

    const method = solana.charge({
      signer,
      ...(rpcUrl !== undefined && rpcUrl !== '' ? { rpcUrl } : {}),
      onProgress(event: ProgressEvent) {
        progressCallback?.(event)
      },
    })
    const mppx = Mppx.create({ methods: [method] })

    try {
      const fetchPromise = mppx.fetch(url)

      while (true) {
        if (steps.length > 0) {
          yield steps.shift()!
          continue
        }

        const result = await Promise.race([
          fetchPromise.then((r: Response) => ({ done: true as const, response: r })),
          new Promise<{ done: false }>((r) => {
            resolve = () => r({ done: false })
          }),
        ])

        if (result.done) {
          while (steps.length > 0) yield steps.shift()!

          const response = result.response
          const text = await response.text()
          let data: unknown
          try {
            data = JSON.parse(text) as unknown
          } catch {
            data = text
          }

          if (isBlockhashVerificationFailure(response.status, data) && attempt < MAX_BLOCKHASH_RETRIES - 1) {
            break
          }

          if (response.ok && response.status === 200) {
            yield { type: 'success', data, status: response.status }
            return
          }

          const msg =
            typeof data === 'object' && data !== null && 'detail' in data
              ? String((data as { detail?: string }).detail)
              : typeof data === 'string'
                ? data
                : JSON.stringify(data)
          const friendly =
            response.status === 429 || /429|rate limit|too many requests/i.test(msg)
              ? `${msg || "HTTP 429"} — Solana RPC rate-limited this request. Wait a minute, set VITE_SOLANA_RPC_URL to your own endpoint, then try again.`
              : msg || `HTTP ${response.status}`
          yield { type: 'error', message: friendly }
          return
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      yield { type: 'error', message }
      return
    }
  }

  yield {
    type: 'error',
    message:
      'Payment failed after several tries — the transaction kept using an expired blockhash. Approve faster in Phantom, or try again.',
  }
}
