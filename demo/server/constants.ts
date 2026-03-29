/** Mainnet USDC — also used by Surfpool localnet (cloned mint). */
export const USDC_MINT_MAINNET = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
/** Devnet / testnet USDC (same mint on both public clusters for testing). */
export const USDC_MINT_DEVNET = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'

export const USDC_DECIMALS = 6
export const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'

export function usdcMintForNetwork(network: string): string {
  if (network === 'localnet') return USDC_MINT_MAINNET
  if (network === 'mainnet-beta') return USDC_MINT_MAINNET
  return USDC_MINT_DEVNET
}
