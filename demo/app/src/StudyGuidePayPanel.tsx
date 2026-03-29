import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { createWalletAdapterPartialSigner, publicKeyToAddress } from "./walletAdapterPartialSigner.js";
import { payAndFetchWithSigner } from "./payWithSigner.js";
import type { Step } from "./wallet.js";

const ENDPOINT = "/api/v1/study-guide";

/**
 * Optional override. If unset, the MPP client uses the RPC implied by the 402 challenge’s `network`
 * (must match the demo server’s `NETWORK` / `SOLANA_RPC_URL` or you get stale / wrong-cluster blockhashes).
 */
export const RPC_URL: string | undefined =
  typeof import.meta.env !== "undefined" && import.meta.env.VITE_SOLANA_RPC_URL
    ? String(import.meta.env.VITE_SOLANA_RPC_URL)
    : undefined;

/** Same defaults as `demo/server/index.ts` — payer Phantom wallet → server payment recipient. */
export const PAY_FROM_PUBKEY = "68qBsheVJSzrjFtBReiG8EHx8D7QcX9R45epJAN9oFSK";
export const SEND_TO_PUBKEY = "HLWMVms22Y7bXeiXWERwH7Bb8AyGqMtGe2NwVs3DDb61";

export type PayPanelVariant = "standalone" | "embedded";

type Props = {
  variant?: PayPanelVariant;
  /** Show link to legacy /charges */
  showFooterLink?: boolean;
};

export function StudyGuidePayPanel({ variant = "standalone", showFooterLink = true }: Props) {
  const { wallet, publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [running, setRunning] = useState(false);
  const [statusLine, setStatusLine] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [txSig, setTxSig] = useState<string | null>(null);

  const [solHuman, setSolHuman] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey || !connected) {
      setSolHuman(null);
      return;
    }
    connection
      .getBalance(publicKey)
      .then((l) => setSolHuman(l / 1e9))
      .catch(() => setSolHuman(null));
  }, [publicKey, connected, connection]);

  const refreshBalance = useCallback(async () => {
    if (!publicKey) {
      setSolHuman(null);
      return;
    }
    try {
      const lamports = await connection.getBalance(publicKey);
      setSolHuman(lamports / 1e9);
    } catch {
      setSolHuman(null);
    }
  }, [connection, publicKey]);

  const downloadMd = (text: string) => {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "avatar-cca-master.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGetGuide = async () => {
    if (running || !wallet?.adapter || !publicKey) return;
    const adapter = wallet.adapter as SignerWalletAdapter;
    if (typeof adapter.signTransaction !== "function") {
      setError("This wallet cannot sign transactions. Try Phantom.");
      return;
    }
    setRunning(true);
    setError(null);
    setMarkdown(null);
    setStatusLine(null);
    setTxSig(null);

    const signer = createWalletAdapterPartialSigner(
      adapter,
      publicKeyToAddress(publicKey),
    );

    try {
      for await (const step of payAndFetchWithSigner(ENDPOINT, signer, RPC_URL)) {
        applyPaymentStep(step, setStatusLine, setMarkdown, setError, downloadMd, setTxSig);
      }
    } finally {
      setRunning(false);
      refreshBalance();
    }
  };

  const lowSol = solHuman !== null && solHuman < 0.11;
  const wrongPayer =
    connected &&
    publicKey &&
    publicKey.toBase58() !== PAY_FROM_PUBKEY;

  const s = variant === "embedded" ? embedded : standalone;

  return (
    <div style={s.page}>
      <div style={s.shell}>
        {variant === "standalone" && (
          <>
            <p style={s.kicker}>Testnet · Solana payment</p>
            <h2 style={s.title}>Unlock the master reference</h2>
            <p style={s.sub}>
              Phantom on <strong>Solana Testnet</strong>. <strong>0.10 SOL</strong> unlocks the full markdown
              guide (plus a small network fee).
            </p>

            <div style={s.demoPair}>
              <div style={s.demoPairTitle}>Payment flow</div>
              <p style={s.demoPairLine}>
                <strong>Pay from</strong> (connect in Phantom):<br />
                <code style={s.code}>{PAY_FROM_PUBKEY}</code>
              </p>
              <p style={s.demoPairLine}>
                <strong>Receives</strong>:<br />
                <code style={s.code}>{SEND_TO_PUBKEY}</code>
              </p>
            </div>

            <p style={s.rpcLine}>
              RPC (payment tx):{" "}
              <code style={s.code}>{RPC_URL ?? `${connection.rpcEndpoint} (from 402 challenge)`}</code>
            </p>
          </>
        )}

        <div style={s.walletRow}>
          <WalletMultiButton style={s.walletBtn} />
        </div>

        {connected && publicKey && (
          <p style={s.addr}>
            {publicKey.toBase58().slice(0, 6)}…{publicKey.toBase58().slice(-4)}
            {solHuman !== null && (
              <span style={s.bal}> · {solHuman.toFixed(4)} SOL</span>
            )}
          </p>
        )}

        {wrongPayer && (
          <div style={s.hint}>
            Tip: switch Phantom to the <strong>Pay from</strong> account so the payment routes correctly.
          </div>
        )}

        <div style={s.priceRow}>
          <span style={s.price}>0.10 SOL</span>
          <span style={s.priceHint}>testnet</span>
        </div>

        {connected && lowSol && (
          <div style={s.hint}>
            Need more testnet SOL on the connected account (about 0.11+ total including fee).
          </div>
        )}

        <button
          type="button"
          style={{
            ...s.cta,
            opacity: running || !connected || lowSol ? 0.65 : 1,
            cursor: running || !connected || lowSol ? "not-allowed" : "pointer",
          }}
          onClick={handleGetGuide}
          disabled={running || !connected || lowSol}
        >
          {running ? "Working…" : "Pay 0.10 SOL & download"}
        </button>

        {statusLine && !error && <p style={s.status}>{statusLine}</p>}
        {error && <p style={s.err}>{error}</p>}

        {txSig && (
          <p style={s.explorer}>
            <a
              href={`https://solscan.io/tx/${txSig}?cluster=testnet`}
              target="_blank"
              rel="noreferrer"
              style={s.explorerLink}
            >
              View transaction on Solscan (testnet)
            </a>
          </p>
        )}

        {markdown && (
          <div style={s.previewWrap}>
            <div style={s.previewHead}>Preview</div>
            <pre style={s.preview}>{markdown}</pre>
          </div>
        )}

        {showFooterLink && variant === "standalone" && (
          <div style={s.footer}>
            <Link to="/charges" style={s.link}>
              Legacy API demo (keypair)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function applyPaymentStep(
  step: Step,
  setStatusLine: (t: string | null) => void,
  setMarkdown: (t: string | null) => void,
  setError: (t: string | null) => void,
  downloadMd: (t: string) => void,
  setTxSig: (s: string | null) => void,
) {
  switch (step.type) {
    case "request":
      setStatusLine("Requesting resource…");
      break;
    case "challenge": {
      const d = step.currency === "sol" ? 9 : 6;
      const human = (Number(step.amount) / 10 ** d).toFixed(2);
      setStatusLine(`Payment required: ${human} ${step.currency ?? "SOL"}`);
      break;
    }
    case "signing":
      setStatusLine("Approve in Phantom…");
      break;
    case "paying":
      setStatusLine("Submitting transaction…");
      break;
    case "confirming":
      setTxSig(step.signature);
      setStatusLine(`Confirming ${step.signature.slice(0, 16)}…`);
      break;
    case "paid":
      setTxSig(step.signature);
      setStatusLine("Payment confirmed.");
      break;
    case "success": {
      const body = step.data;
      const text =
        typeof body === "string" ? body : JSON.stringify(body, null, 2);
      setMarkdown(text);
      downloadMd(text);
      setStatusLine("Download started · avatar-cca-master.md");
      break;
    }
    case "error":
      setError(step.message);
      setStatusLine(null);
      break;
  }
}

const standalone: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    background: "transparent",
    fontFamily: 'Georgia, "Times New Roman", serif',
  },
  shell: {
    width: "100%",
    maxWidth: 440,
    textAlign: "center",
    margin: "0 auto",
  },
  kicker: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    color: "var(--cca-gold-lt, #f0cc72)",
    margin: "0 0 12px",
  },
  title: {
    fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 12px",
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "var(--cca-text-dim, #8fa4b8)",
    margin: "0 0 16px",
  },
  demoPair: {
    margin: "0 0 18px",
    padding: "14px 16px",
    textAlign: "left" as const,
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(212,168,67,.25)",
    borderRadius: 10,
  },
  demoPairTitle: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase" as const,
    color: "var(--cca-gold, #d4a843)",
    marginBottom: 10,
  },
  demoPairLine: {
    fontSize: 12,
    lineHeight: 1.55,
    color: "var(--cca-text, #e8edf2)",
    margin: "0 0 8px",
    wordBreak: "break-all",
  },
  rpcLine: {
    fontSize: 11,
    color: "#666",
    marginBottom: 16,
    wordBreak: "break-all",
  },
  code: {
    fontFamily: "JetBrains Mono, monospace",
    color: "#a8b8c8",
  },
  walletRow: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 12,
  },
  walletBtn: {},
  addr: {
    fontSize: 12,
    color: "#888",
    fontFamily: "JetBrains Mono, monospace",
    marginBottom: 16,
  },
  bal: { color: "#8ab04a" },
  priceRow: {
    marginBottom: 24,
  },
  price: {
    display: "block",
    fontSize: 22,
    fontWeight: 600,
    color: "#E8E8F0",
    fontFamily: "JetBrains Mono, monospace",
  },
  priceHint: {
    display: "block",
    fontSize: 12,
    color: "#5c5c6e",
    marginTop: 6,
  },
  hint: {
    marginBottom: 16,
    padding: 12,
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(212,168,67,.2)",
    borderRadius: 10,
    fontSize: 13,
    color: "#b8b8c8",
    textAlign: "left" as const,
  },
  cta: {
    width: "100%",
    padding: "16px 28px",
    background: "linear-gradient(135deg, #e85d24 0%, #f5a623 100%)",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Georgia, serif",
    letterSpacing: 0.3,
    boxShadow: "0 8px 24px rgba(232,93,36,.35)",
  },
  status: {
    marginTop: 16,
    fontSize: 13,
    color: "#8b8b9e",
    fontFamily: "JetBrains Mono, monospace",
  },
  err: {
    marginTop: 16,
    fontSize: 13,
    color: "#f88",
  },
  explorer: {
    marginTop: 12,
    fontSize: 13,
  },
  explorerLink: {
    color: "var(--cca-gold-lt, #f0cc72)",
  },
  previewWrap: {
    marginTop: 28,
    textAlign: "left" as const,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.1)",
    overflow: "hidden",
    background: "rgba(0,0,0,.25)",
  },
  previewHead: {
    padding: "8px 12px",
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    color: "#666",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    background: "rgba(0,0,0,.2)",
  },
  preview: {
    margin: 0,
    padding: 16,
    maxHeight: 280,
    overflow: "auto",
    fontSize: 12,
    lineHeight: 1.55,
    color: "#c4c4d0",
    fontFamily: "JetBrains Mono, monospace",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  },
  footer: {
    marginTop: 28,
    fontSize: 13,
  },
  link: {
    color: "var(--cca-gold-lt, #f0cc72)",
    textDecoration: "none",
  },
};

const embedded: Record<string, React.CSSProperties> = {
  ...standalone,
  page: {
    ...standalone.page,
    padding: "16px 0 2rem",
  },
  shell: {
    ...standalone.shell,
    maxWidth: 520,
    paddingBottom: "0.5rem",
  },
};
