import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Request, Response } from 'express'
import {
  address,
  generateKeyPairSigner,
  createKeyPairSignerFromBytes,
  createSolanaRpc,
  getBase58Encoder,
  type KeyPairSigner,
} from '@solana/kit'
import { registerStocks } from './modules/stocks.js'
import { registerWeather } from './modules/weather.js'
import { registerFaucet } from './modules/faucet.js'
import { registerMarketplace } from './modules/marketplace.js'
import { registerStudyGuide } from './modules/studyGuide.js'
import { ensureSolBalance, getBalanceLamports } from './airdrop.js'
import { resolveDemoNetwork, resolveRpcUrl, type DemoCluster } from './rpcEnv.js'

const dim = (s: string) => `\x1b[2m${s}\x1b[0m`

/** Rent-exempt minimum for a 0-byte system account: must exist before `transfer` can credit it. */
const RECIPIENT_MIN_LAMPORTS = 890_880

/** Default testnet pairing for the study-guide demo (override with `RECIPIENT` / `DEMO_PAYER_PUBKEY`). */
const DEFAULT_DEMO_RECIPIENT = 'HLWMVms22Y7bXeiXWERwH7Bb8AyGqMtGe2NwVs3DDb61'
const DEFAULT_DEMO_PAYER_PUBKEY = '68qBsheVJSzrjFtBReiG8EHx8D7QcX9R45epJAN9oFSK'

// Recipient is the address that receives payments (the “merchant” / second browser wallet in the demo).
const RECIPIENT = process.env.RECIPIENT ?? DEFAULT_DEMO_RECIPIENT
const DEMO_PAYER_PUBKEY = process.env.DEMO_PAYER_PUBKEY ?? DEFAULT_DEMO_PAYER_PUBKEY

const NETWORK: DemoCluster = resolveDemoNetwork()
const RPC_URL = resolveRpcUrl(NETWORK)
const SECRET_KEY = process.env.MPP_SECRET_KEY ?? crypto.randomBytes(32).toString('hex')

// ── Fee payer signer ──
// The server pays transaction fees on behalf of clients.
// Uses FEE_PAYER_KEY env var (base58 keypair) or generates a fresh one.

let feePayerSigner: KeyPairSigner

if (process.env.FEE_PAYER_KEY) {
  const bytes = getBase58Encoder().encode(process.env.FEE_PAYER_KEY)
  feePayerSigner = await createKeyPairSignerFromBytes(bytes)
} else {
  feePayerSigner = await generateKeyPairSigner()
}

// Fund fee payer: Surfpool cheatcode on localnet; devnet/testnet via airdrops; mainnet = manual
if (NETWORK === 'localnet') {
  try {
    const res = await fetch('http://localhost:8899', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'surfnet_setAccount',
        params: [
          feePayerSigner.address,
          {
            lamports: 100_000_000_000, // 100 SOL
            data: '',
            executable: false,
            owner: '11111111111111111111111111111111',
            rentEpoch: 0,
          },
        ],
      }),
    })
    const data = (await res.json()) as { error?: any }
    if (data.error) {
      console.warn('Could not fund fee payer via surfpool:', data.error)
    }
  } catch {
    console.warn('Surfpool not reachable — fee payer may not have SOL for fees.')
  }
  try {
    const res = await fetch('http://localhost:8899', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'surfnet_setAccount',
        params: [
          RECIPIENT,
          {
            lamports: 5_000_000_000, // 5 SOL — recipient account must exist for native transfers
            data: '',
            executable: false,
            owner: '11111111111111111111111111111111',
            rentEpoch: 0,
          },
        ],
      }),
    })
    const data = (await res.json()) as { error?: unknown }
    if (data.error) {
      console.warn('Could not fund recipient via surfpool:', data.error)
    }
  } catch {
    console.warn('Surfpool not reachable — recipient may not exist on-chain for SOL transfers.')
  }
} else if (NETWORK === 'mainnet-beta') {
  console.warn('MAINNET: fund FEE_PAYER_KEY with SOL for transaction fees.')
  console.warn(
    'MAINNET: send a small amount of SOL to RECIPIENT so the account exists (required for native transfer simulation).',
  )
} else {
  console.log('Funding fee payer on', NETWORK, '…')
  await ensureSolBalance(RPC_URL, feePayerSigner.address, 50_000_000, {
    label: 'fee payer',
    maxRounds: 8,
  })
  const fpBal = await getBalanceLamports(RPC_URL, feePayerSigner.address).catch(() => 0)
  if (fpBal < 50_000_000) {
    console.warn()
    console.warn(
      '  Fee payer needs test SOL for transaction fees. If RPC airdrops failed, send SOL to:',
    )
    console.warn(`  ${feePayerSigner.address}`)
    console.warn(`  ${dim('https://faucet.solana.com')}`)
    console.warn(`  Or set ${dim('FEE_PAYER_KEY')} to a funded base58 keypair.`)
    console.warn()
  }
  // Native SOL `transfer` requires the destination account to exist; zero-lamport keys are not on-chain.
  console.log('Funding payment recipient on', NETWORK, '…')
  await ensureSolBalance(RPC_URL, RECIPIENT, RECIPIENT_MIN_LAMPORTS, {
    label: 'recipient',
    maxRounds: 8,
  })
  const recBal = await getBalanceLamports(RPC_URL, RECIPIENT).catch(() => 0)
  if (recBal < RECIPIENT_MIN_LAMPORTS) {
    console.warn()
    console.warn(
      '  Payment recipient account must exist on-chain for native SOL transfers. If airdrops failed, send test SOL to:',
    )
    console.warn(`  ${RECIPIENT}`)
    console.warn(`  ${dim('https://faucet.solana.com')}`)
    console.warn()
  }
}

// ── Express app ──

const app = express()
app.use(express.json())
app.use(
  cors({
    exposedHeaders: [
      'www-authenticate',
      'payment-receipt',
    ],
  }),
)

// Health check — also exposes fee payer / recipient balances for the UI
app.get('/api/v1/health', async (_req: Request, res: Response) => {
  let feePayerBalance: number | undefined
  let recipientBalance: number | undefined
  try {
    const rpc = createSolanaRpc(RPC_URL)
    const [fp, rec] = await Promise.all([
      rpc.getBalance(feePayerSigner.address).send(),
      rpc.getBalance(address(RECIPIENT)).send(),
    ])
    feePayerBalance = Number(fp.value) / 1e9
    recipientBalance = Number(rec.value) / 1e9
  } catch { /* RPC down */ }
  res.json({
    ok: true,
    network: NETWORK,
    rpcUrl: RPC_URL,
    feePayer: feePayerSigner.address,
    feePayerBalance,
    recipient: RECIPIENT,
    recipientBalance,
    /** For study-guide: connect Phantom with this account as payer (user-paid tx fees). */
    demoPayerPubkey: DEMO_PAYER_PUBKEY,
  })
})

// Register modules
registerStocks(app, RECIPIENT, NETWORK, SECRET_KEY, feePayerSigner, RPC_URL)
registerWeather(app, RECIPIENT, NETWORK, SECRET_KEY, feePayerSigner, RPC_URL)
registerFaucet(app, NETWORK)
registerMarketplace(app, RECIPIENT, NETWORK, SECRET_KEY, feePayerSigner, RPC_URL)
registerStudyGuide(app, RECIPIENT, NETWORK, SECRET_KEY, RPC_URL)

// Serve SPA in production
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appDist = path.join(__dirname, '../app/dist')
app.use(express.static(appDist))
app.get('*splat', (_req: Request, res: Response) => {
  res.sendFile(path.join(appDist, 'index.html'))
})

// ANSI colors
const green = (s: string) => `\x1b[32m${s}\x1b[0m`
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`
const magenta = (s: string) => `\x1b[35m${s}\x1b[0m`
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log()
  console.log(bold('  solana-mpp demo'))
  console.log()
  console.log(`  ${dim('Server')}      ${cyan(`http://localhost:${PORT}`)}`)
  console.log(`  ${dim('RPC')}         ${dim(RPC_URL)}`)
  console.log(`  ${dim('Recipient')}   ${green(RECIPIENT)}`)
  console.log(`  ${dim('Study guide payer (Phantom)')}  ${green(DEMO_PAYER_PUBKEY)}`)
  console.log(`  ${dim('Fee payer')}   ${green(feePayerSigner.address)}  ${dim('(other paid routes)')}`)
  console.log(`  ${dim('Network')}     ${magenta(NETWORK)}`)
  console.log()
  console.log(bold('  Endpoints'))
  console.log()
  const endpoints = [
    { method: 'GET',  path: '/api/v1/stocks/quote/:symbol',  cost: '0.01 USDC' },
    { method: 'GET',  path: '/api/v1/stocks/search?q=',      cost: '0.01 USDC' },
    { method: 'GET',  path: '/api/v1/stocks/history/:symbol', cost: '0.05 USDC' },
    { method: 'GET',  path: '/api/v1/weather/:city',          cost: '0.01 USDC' },
    { method: 'GET',  path: '/api/v1/marketplace/products',    cost: '' },
    { method: 'GET',  path: '/api/v1/marketplace/buy/:id',    cost: 'varies (splits: seller + platform 5% + referral 2%)' },
    { method: 'POST', path: '/api/v1/faucet/airdrop',         cost: '' },
    { method: 'GET',  path: '/api/v1/faucet/status',           cost: '' },
    { method: 'GET',  path: '/api/v1/study-guide',             cost: '0.10 SOL', feeNote: 'payer pays network fees' },
  ] as const
  const maxMethod = Math.max(...endpoints.map(e => e.method.length))
  const maxPath = Math.max(...endpoints.map(e => e.path.length))
  for (const ep of endpoints) {
    const m = ep.method === 'POST' ? cyan(ep.method) : green(ep.method)
    const mPad = ' '.repeat(maxMethod - ep.method.length)
    const pPad = ' '.repeat(maxPath - ep.path.length)
    const feeNote = 'feeNote' in ep && ep.feeNote ? ep.feeNote : 'server pays fees'
    const cost = ep.cost ? `${yellow(ep.cost)}  ${dim(feeNote)}` : dim('free')
    console.log(`  ${m}${mPad}  ${ep.path}${pPad}  ${cost}`)
  }
  console.log()
})
