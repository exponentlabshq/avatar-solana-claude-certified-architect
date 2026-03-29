import type { Express } from 'express'
import { ensureSolBalance } from '../airdrop.js'
import type { DemoCluster } from '../rpcEnv.js'
import { resolveRpcUrl } from '../rpcEnv.js'
import { TOKEN_PROGRAM, USDC_MINT_MAINNET } from '../constants.js'

const SURFPOOL_RPC = 'http://localhost:8899'

// Surfpool: mainnet USDC mint cloned into local simnet
const SOL_AMOUNT = 100_000_000_000 // 100 SOL in lamports
const USDC_AMOUNT = 100_000_000 // 100 USDC (6 decimals)

async function surfpoolRpcCall(method: string, params: unknown[]) {
  const res = await fetch(SURFPOOL_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  const data = (await res.json()) as { result?: any; error?: { message: string } }
  if (data.error) throw new Error(`${method}: ${data.error.message}`)
  return data.result
}

export function registerFaucet(app: Express, network: DemoCluster) {
  const rpcUrl = resolveRpcUrl(network)
  const isLocalnet = network === 'localnet'

  app.get('/api/v1/faucet/status', (_req, res) => {
    res.json({
      network,
      rpcUrl,
      mode: isLocalnet ? 'surfpool' : 'cluster',
      solAmount: isLocalnet ? '100 SOL' : 'test SOL (devnet/testnet airdrop)',
      usdcAmount: isLocalnet ? '100 USDC' : 'not auto-funded (mint devnet USDC separately)',
      usdcMint: isLocalnet ? USDC_MINT_MAINNET : '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    })
  })

  app.post('/api/v1/faucet/airdrop', async (req, res) => {
    const { address } = req.body
    if (!address) {
      return res.status(400).json({ error: 'Missing address in request body' })
    }

    if (isLocalnet) {
      try {
        await surfpoolRpcCall('surfnet_setAccount', [
          address,
          {
            lamports: SOL_AMOUNT,
            data: '',
            executable: false,
            owner: '11111111111111111111111111111111',
            rentEpoch: 0,
          },
        ])

        await surfpoolRpcCall('surfnet_setTokenAccount', [
          address,
          USDC_MINT_MAINNET,
          {
            amount: USDC_AMOUNT,
            state: 'initialized',
          },
          TOKEN_PROGRAM,
        ])

        res.json({
          ok: true,
          sol: '100 SOL',
          usdc: '100 USDC',
        })
      } catch (err: any) {
        res.status(500).json({
          error: 'Airdrop failed',
          details: err?.message ?? String(err),
        })
      }
      return
    }

    if (network === 'mainnet-beta') {
      return res.status(400).json({
        error: 'Airdrop is not available on mainnet',
      })
    }

    try {
      await ensureSolBalance(rpcUrl, address, 200_000_000, {
        label: 'wallet',
        maxRounds: 6,
      })
      res.json({
        ok: true,
        sol: '~2 SOL (cluster airdrop; rate limits may apply)',
        usdc: '0 — get devnet USDC from a faucet if you need paid USDC demos',
      })
    } catch (err: any) {
      res.status(500).json({
        error: 'Airdrop failed',
        details: err?.message ?? String(err),
      })
    }
  })
}
