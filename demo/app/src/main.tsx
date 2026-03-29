import { StrictMode, useMemo, Component, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import '@solana/wallet-adapter-react-ui/styles.css'
import App from './App.js'

class RootErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null }
  static getDerivedStateFromError(err: Error) {
    return { err }
  }
  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error(err, info)
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui', color: '#e88', background: '#0a0a0c', minHeight: '100vh' }}>
          <h1 style={{ color: '#fff' }}>Something broke</h1>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>{String(this.state.err)}</pre>
          <p style={{ marginTop: 16, color: '#888' }}>Open the browser console (⌥⌘J) for the stack trace.</p>
        </div>
      )
    }
    return this.props.children
  }
}

const endpoint =
  (import.meta.env.VITE_SOLANA_RPC_URL as string | undefined) ??
  'https://api.testnet.solana.com'

function Root() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <Root />
    </RootErrorBoundary>
  </StrictMode>,
)
