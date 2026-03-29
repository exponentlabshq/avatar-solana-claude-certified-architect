# MPP and this project: overview

This document describes **what MPP is**, how **`@solana/mpp`** implements it on Solana, and how the pieces in **this repository** fit together.

---

## What MPP is

**MPP** ([Machine Payments Protocol](https://mpp.dev)) is part of an ecosystem of ideas around **paying for HTTP APIs with cryptocurrency**. A related framing is **HTTP Payment Authentication** ([paymentauth.org](https://paymentauth.org)): the server can refuse access until the client proves payment.

Concretely, the familiar pattern is:

1. The client calls your API (e.g. `GET /api/v1/study-guide`).
2. If the user has not paid, the server responds with **`402 Payment Required`** and a **challenge** (how much to pay, to which address, which asset, which network, etc.).
3. The client **builds and signs** a Solana transaction that satisfies the challenge.
4. The client **sends proof** back (signed transaction bytes or a transaction signature, depending on mode).
5. The server **verifies on-chain**, records the payment so it cannot be replayed, and returns **`200`** with the resource (often with a **`Payment-Receipt`** header).

So MPP is not “a Solana program you deploy once”; it is **HTTP + structured challenges + Solana transfers + receipts**, implemented by a small stack on the server and client.

---

## What `@solana/mpp` provides

This repo ships a **TypeScript SDK** (`typescript/packages/mpp`) that maps that protocol onto **Solana**:

| Piece | Role |
| --- | --- |
| **Shared schemas** (`Methods.ts`, `constants.ts`) | Agreed shape of charges, currencies, networks, token programs. |
| **`@solana/mpp/server`** | Builds **402 challenges**, verifies credentials, can **simulate**, **broadcast**, and **confirm** transactions, optional **fee-payer co-signing**, **replay protection** via a store of consumed signatures. |
| **`@solana/mpp/client`** | Given a **signer** (wallet), performs **`fetch` → 402 → sign → retry with payment** so app code can look like “call this paid URL.” |

Under the hood, the SDK cooperates with **`mppx`** (types, `Mppx` orchestration, `Store` for receipts/replay state) and **`@solana/kit`** for RPC and transactions.

---

## Charge settlement modes

The **charge** method supports two ways to settle:

1. **`type="transaction"` (pull / default)**  
   The client signs a transaction and sends **base64-encoded transaction bytes** to the server. The server may **co-sign as fee payer** if configured, then **simulates**, **broadcasts**, waits for confirmation, and **verifies** the transfer matches the challenge.

2. **`type="signature"` (push)**  
   The client **submits the transaction to the network** first, then sends the **signature** to the server. The server loads the transaction from RPC and verifies it.

Replay protection: successful payments are tied to **consumed transaction signatures** in the store so the same proof cannot unlock the resource twice.

---

## Fee sponsorship (optional)

If the server passes a **fee-payer signer** into `solana.charge({ signer: ... })`, the **user** can sign only what their wallet must sign (e.g. SPL transfer authority) while the **server** pays SOL for fees (and, for SPL paths, related costs the implementation covers). The **Avatar study-guide demo in this repo intentionally does *not* use that path**: the connected wallet is the fee payer so the demo can illustrate a clear **payer vs recipient** story on testnet.

---

## End-to-end charge flow (conceptual)

1. **Client** requests a protected URL.
2. **Server** runs `mppx.charge({ amount, currency, ... })(request)`; if unpaid, returns **402** + challenge (recipient, amount, currency, network, optional `recentBlockhash`, etc.).
3. **Client** builds a Solana transfer that matches the challenge, **signs** with the wallet.
4. **Server** validates the credential, confirms on-chain behavior, stores consumption, returns the **successful HTTP response** (and receipt metadata).

---

## How this repository is structured

```
mpp-sdk/
├── typescript/packages/mpp/    # @solana/mpp — shared + client + server charge/session
├── demo/
│   ├── app/                    # Vite + React UI (Avatar CCA, /charges playground, etc.)
│   └── server/               # Express API — paid routes, MPP integration, study-guide file
├── netlify.toml              # Builds the demo app for static hosting (see below)
└── …
```

- **`demo/app`** imports `@solana/mpp/client` (via the local `file:` dependency on `typescript/packages/mpp`). It connects a wallet (e.g. Phantom) and runs the **402 → pay → retry** flow; helpers like `payWithSigner.ts` wrap **`Mppx` + `solana.charge`** with progress events and limited retries for stale blockhashes.
- **`demo/server`** imports **`@solana/mpp/server`**, registers **`solana.charge`** with a recipient, network, and RPC URL, and attaches **`Mppx.create({ secretKey, methods })`** to routes. Example: **`GET /api/v1/study-guide`** charges **0.10 SOL** (testnet) and, on success, returns the markdown file from `avatar-the-last-airbender-master.md` (path overridable with `STUDY_GUIDE_MD_PATH`).

In **development**, Vite proxies **`/api`** to the Express port (`demo/app/vite.config.ts`), so the browser talks to **one origin** while two processes run locally.

In **production** (e.g. **Netlify** for the SPA), the **static site** is only the **`demo/app`** build output. The **Express server** must run **elsewhere** (another host, container, or serverless adapter) unless you add a separate integration. Set **`VITE_*`** and your API base URL so the browser can reach the live backend.

---

## Configuration touchpoints

**Server (demo and production API):** cluster (`NETWORK` / `SOLANA_RPC_URL`), recipient keys, optional **`MPP_SECRET_KEY`** for stable challenge signing across restarts, optional **`FEE_PAYER_KEY`** for sponsored routes on other endpoints, **`STUDY_GUIDE_MD_PATH`** for the markdown asset.

**Client:** optional **`VITE_SOLANA_RPC_URL`**, **`VITE_SOLANA_USDC_MINT`** (see `demo/app/.env.example`) so wallets and RPC line up with the server’s network.

---

## Specs and stability

MPP and the Solana binding are **evolving**. The upstream **Solana charge intent** and HTTP payment-auth details live in community specs (see the root **`README.md`** for links). Treat wire formats and APIs as **subject to change** until the spec stabilizes.

---

## Further reading

- Root **`README.md`** — install, quick start snippets, splits, demo commands.  
- **`demo/README.md`** — ports, env vars, Avatar CCA test flow.  
- **`docs/methods/sessions.md`** — session method (separate from one-shot charge).  
- [mpp.dev](https://mpp.dev) — protocol landing.  
