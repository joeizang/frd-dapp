import { ethers } from 'ethers'
import { createContext } from 'react'

export interface DappContextShape {
  connectToMetamask: () => Promise<void>
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner
  contract: ethers.Contract
  walletAddress: string
  daiAddress: string
}

const DappContext = createContext<DappContextShape>({} as DappContextShape)

export { DappContext }
