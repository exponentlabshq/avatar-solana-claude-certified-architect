import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Express } from 'express'
import { Mppx, solana } from '../sdk.js'
import { toWebRequest, logPayment } from '../utils.js'

/** 0.10 SOL in lamports */
const PRICE_LAMPORTS = '100000000'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** Repo root: demo/server/modules → ../../../ */
const DEFAULT_STUDY_GUIDE_PATH = path.join(__dirname, '../../../avatar-the-last-airbender-master.md')

async function loadStudyGuideMarkdown(): Promise<string> {
  const guidePath = process.env.STUDY_GUIDE_MD_PATH ?? DEFAULT_STUDY_GUIDE_PATH
  return readFile(guidePath, 'utf8')
}

/**
 * Study guide uses **user-paid fees** (no `signer` on the server charge): the connected
 * wallet is fee payer and pays the 0.10 SOL. Use this for two-wallet demos (payer vs recipient).
 */
export function registerStudyGuide(
  app: Express,
  recipient: string,
  network: string,
  secretKey: string,
  rpcUrl: string,
) {
  const mppx = Mppx.create({
    secretKey,
    methods: [
      solana.charge({
        recipient,
        network,
        rpcUrl,
      }),
    ],
  })

  app.get('/api/v1/study-guide', async (req, res) => {
    const result = await mppx.charge({
      amount: PRICE_LAMPORTS,
      currency: 'sol',
      description: 'Avatar CCA master study guide (markdown)',
    })(toWebRequest(req))

    if (result.status === 402) {
      const challenge = result.challenge as Response
      res.writeHead(challenge.status, Object.fromEntries(challenge.headers))
      res.end(await challenge.text())
      return
    }

    let body: string
    try {
      body = await loadStudyGuideMarkdown()
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error('[study-guide] Failed to read markdown:', msg)
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(`Study guide file unavailable: ${msg}`)
      return
    }

    const response = result.withReceipt(
      new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      }),
    ) as Response

    logPayment(req.path, response)
    res.writeHead(response.status, Object.fromEntries(response.headers))
    res.end(await response.text())
  })
}
