# Solana MPP Demo

Interactive demo: a **React (Vite)** frontend talks to an **Express** backend that exposes paid HTTP routes using the [MPP](https://mpp.dev) **402 Payment Required** flow on Solana.

The default experience is the **Avatar CCA** home page: marketing shell, video, and a **Phantom** wallet payment that unlocks the **Avatar CCA master** markdown (`GET /api/v1/study-guide`). A separate **API playground** at `/charges` uses an imported keypair and server-sponsored fees for USDC demos.

## Prerequisites

- **Node.js** >= 20  
- **pnpm** (recommended). The root script `pnpm demo:install` runs `pnpm install` in `demo/server` and `demo/app`. Alternatively, run `npm install` in each of those folders yourself.

## Quick start

Do this from the **repository root** (`mpp-sdk/`).

### 1. Install dependencies

```bash
pnpm demo:install
```

(Equivalent: `cd demo/server && pnpm install && cd ../app && pnpm install`.)

### 2. Start the API (terminal 1)

```bash
pnpm demo:server
```

- Listens on **http://localhost:3000**  
- Default cluster: **testnet** (`NETWORK` defaults to `testnet` in the server)

### 3. Start the UI (terminal 2)

```bash
pnpm demo:app
```

- **http://localhost:5173** — Vite dev server  
- **`/api/*`** is proxied to **http://localhost:3000** (see `demo/app/vite.config.ts`)

### 4. Open the app

| URL | What you get |
| --- | --- |
| **http://localhost:5173/** | Avatar CCA landing + video + **Pay 0.10 SOL & download** (Phantom, testnet) |
| **http://localhost:5173/study-guide** | Same as `/` |
| **http://localhost:5173/charges** | Legacy API playground (keypair, USDC endpoints) |
| **http://localhost:5173/landing** | Marketing page |

### 5. Test the study guide payment

1. Install **Phantom** and switch the network to **Solana Testnet**.  
2. Import or use the wallet whose pubkey matches **Pay from** in the UI (the demo expects a fixed testnet pairing; see server startup logs for `Study guide payer` / `Recipient`).  
3. Ensure that wallet has enough **test SOL** (~**0.11+** for 0.10 SOL + fees). Use [faucet.solana.com](https://faucet.solana.com) if needed.  
4. Click **Pay 0.10 SOL & download** — after confirmation you get a preview and **`avatar-cca-master.md`**. A **Solscan (testnet)** link appears when the transaction signature is known.

### Free stuck ports (optional)

If something is already bound to **3000** or **5173–5180**:

```bash
cd demo/app && pnpm run kill-demo
```

(Same script exists under `demo/server`.)

## Environment variables

Set these when starting the **server** (see `demo/server/index.ts` and `demo/server/modules/studyGuide.ts`).

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `PORT` | `3000` | HTTP port for Express |
| `NETWORK` | `testnet` | `testnet`, `devnet`, `localnet`, or `mainnet-beta` |
| `SOLANA_RPC_URL` | (per `NETWORK`) | Override RPC URL |
| `MPP_SECRET_KEY` | (random at boot) | HMAC / challenge signing — set for stable restarts |
| `RECIPIENT` | demo pubkey | Address that receives SOL for charges |
| `DEMO_PAYER_PUBKEY` | demo pubkey | Expected Phantom “pay from” pubkey shown in the study-guide UI |
| `FEE_PAYER_KEY` | (generated) | Base58 keypair — **server pays tx fees** on USDC and other sponsored routes |
| `STUDY_GUIDE_MD_PATH` | repo `avatar-the-last-airbender-master.md` | Override path to the markdown file returned after payment |

**Study guide** charges use **user-paid** network fees (Phantom is fee payer for the transfer). Other paid routes often use **fee payer** mode; if the server logs say the fee payer could not be funded, fund `FEE_PAYER_KEY`’s address or set `FEE_PAYER_KEY` to a funded testnet key — otherwise **only** the study-guide path may work when your Phantom account is funded.

Frontend (optional):

| Variable | Description |
| -------- | ----------- |
| `VITE_SOLANA_RPC_URL` | RPC used by the wallet adapter (should match server testnet/devnet) |

## API overview

| Method | Path | Notes |
| ------ | ---- | ----- |
| GET | `/api/v1/study-guide` | **0.10 SOL** — payer pays fees; returns markdown after payment |
| GET | `/api/v1/stocks/quote/:symbol` | USDC; server pays fees |
| GET | `/api/v1/stocks/search` | USDC; server pays fees |
| GET | `/api/v1/stocks/history/:symbol` | USDC; server pays fees |
| GET | `/api/v1/weather/:city` | USDC; server pays fees |
| GET | `/api/v1/marketplace/products` | Free |
| GET | `/api/v1/marketplace/buy/:id` | Paid (splits); server pays fees |
| GET / POST | `/api/v1/faucet/*` | Faucet helpers (most useful on **localnet** with Surfpool) |

## Optional: Surfpool (localnet)

For a fully local Solana sim (e.g. USDC demos with server fee payer without relying on public faucets):

1. Install [Surfpool](https://docs.surfpool.run/toolchain/getting-started).  
2. `surfpool start`  
3. Start the demo with `NETWORK=localnet` (and usually `SOLANA_RPC_URL=http://localhost:8899` if not implied).

## Running tests

From the repo root:

```bash
npm test
npm run test:integration
npm run test:all
```

## Project structure (high level)

```
demo/
├── app/                 # Vite + React
│   ├── public/          # Static assets (e.g. video-for-website.mp4)
│   └── src/
│       ├── App.tsx              Routes
│       ├── AvatarCCAHome.tsx    Landing + video + pay section
│       ├── StudyGuidePayPanel.tsx
│       ├── StudyGuide.tsx       Thin standalone pay page (optional)
│       ├── wallet.ts            Playground client (keypair)
│       └── ...
└── server/
    ├── index.ts
    └── modules/
        ├── studyGuide.ts       Paid markdown file
        ├── stocks.ts
        ├── weather.ts
        ├── marketplace.ts
        └── faucet.ts
```
