/** Mirrors @solana/mpp DEFAULT_RPC_URLS (demo cannot import non-exported path). */
const DEFAULT_RPC_URLS: Record<string, string> = {
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  localnet: 'http://localhost:8899',
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
}

/** Solana cluster for the demo server (default: public devnet — test SOL). */
export type DemoCluster = 'devnet' | 'testnet' | 'localnet' | 'mainnet-beta'

export function resolveDemoNetwork(): DemoCluster {
  const n = (process.env.NETWORK ?? 'testnet').toLowerCase()
  if (n === 'testnet' || n === 'devnet' || n === 'localnet' || n === 'mainnet-beta') {
    return n
  }
  return 'testnet'
}

export function resolveRpcUrl(network: DemoCluster): string {
  if (process.env.SOLANA_RPC_URL) return process.env.SOLANA_RPC_URL
  return DEFAULT_RPC_URLS[network] ?? DEFAULT_RPC_URLS.devnet
}
