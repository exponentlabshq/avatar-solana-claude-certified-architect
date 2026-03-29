import {
  address,
  type Address,
  type Transaction,
  getBase64EncodedWireTransaction,
} from '@solana/kit'
import { fromVersionedTransaction } from '@solana/compat'
import type { SignatureDictionary, TransactionPartialSigner } from '@solana/signers'
import type { SignerWalletAdapter } from '@solana/wallet-adapter-base'
import { VersionedTransaction } from '@solana/web3.js'

function base64ToUint8Array(b64: string): Uint8Array {
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

/**
 * Bridges {@link SignerWalletAdapter} (Phantom, etc.) to Kit's {@link TransactionPartialSigner}
 * for MPP fee-payer flows: the wallet only adds its signature; the server adds the fee payer sig.
 */
export function createWalletAdapterPartialSigner(
  adapter: SignerWalletAdapter,
  userAddress: Address<string>,
): TransactionPartialSigner {
  return {
    address: userAddress,
    signTransactions: async (transactions: readonly Transaction[]) => {
      const results: SignatureDictionary[] = []

      for (const tx of transactions) {
        const b64 = getBase64EncodedWireTransaction(tx)
        const bytes = base64ToUint8Array(b64)
        const vtx = VersionedTransaction.deserialize(bytes)
        const signed = await adapter.signTransaction(vtx)
        const kitSigned = fromVersionedTransaction(signed)
        const sig = kitSigned.signatures[userAddress]
        if (sig == null) {
          const keys = Object.keys(kitSigned.signatures)
          throw new Error(
            `Wallet did not sign as expected address ${String(userAddress)}. Signature slots: ${keys.join(', ')}`,
          )
        }
        results.push({ [userAddress]: sig } as SignatureDictionary)
      }

      return results
    },
  }
}

/** `publicKey.toBase58()` → Kit {@link Address}. */
export function publicKeyToAddress(pubkey: { toBase58(): string }): Address {
  return address(pubkey.toBase58())
}
