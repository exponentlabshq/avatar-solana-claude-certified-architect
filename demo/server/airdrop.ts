/**
 * Devnet / testnet SOL via public RPC `requestAirdrop` (not available on mainnet).
 */

import { createSolanaRpc, address } from '@solana/kit'

export async function jsonRpc<T>(rpcUrl: string, method: string, params: unknown[]): Promise<T> {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  const data = (await res.json()) as { result?: T; error?: { message: string } }
  if (data.error) throw new Error(data.error.message)
  return data.result as T
}

export async function getBalanceLamports(rpcUrl: string, pubkey: string): Promise<number> {
  const rpc = createSolanaRpc(rpcUrl)
  const { value } = await rpc.getBalance(address(pubkey)).send()
  return Number(value)
}

/** Ensure at least `minLamports` SOL using repeated airdrops (rate limits may require several attempts). */
export async function ensureSolBalance(
  rpcUrl: string,
  address: string,
  minLamports: number,
  options: { label?: string; maxRounds?: number } = {},
): Promise<void> {
  const label = options.label ?? address.slice(0, 8)
  const maxRounds = options.maxRounds ?? 10
  const perAirdrop = 1_000_000_000 // 1 SOL — within typical devnet limits

  for (let round = 0; round < maxRounds; round++) {
    const bal = await getBalanceLamports(rpcUrl, address)
    if (bal >= minLamports) {
      console.log(`  ${label}… ${(bal / 1e9).toFixed(4)} SOL on RPC`)
      return
    }
    try {
      await jsonRpc<string>(rpcUrl, 'requestAirdrop', [address, perAirdrop])
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      console.warn(`  Airdrop (${label}): ${msg}`)
    }
    await new Promise((r) => setTimeout(r, 2500))
  }

  const finalBal = await getBalanceLamports(rpcUrl, address)
  if (finalBal < minLamports) {
    console.warn(
      `  Could not fund ${label} to ${minLamports} lamports (have ${finalBal}). Set FEE_PAYER_KEY or fund manually.`,
    )
  }
}
