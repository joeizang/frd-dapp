import { ethers } from 'ethers'
import { createContext } from 'react'

export interface DappContextShape {
  provider: ethers.providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  walletAddress: string
}

const DappContext = createContext<DappContextShape>({} as DappContextShape)

export { DappContext }
