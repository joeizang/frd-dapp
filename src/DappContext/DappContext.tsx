import { ethers } from 'ethers'
import { createContext } from 'react'

export interface DappContextShape {
  connectToMetamask: () => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any
  signer: ethers.providers.JsonRpcSigner
  walletAddress: string
}

const DappContext = createContext<DappContextShape>({} as DappContextShape)

export { DappContext }
