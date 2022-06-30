/// <reference types="vite/client" />

import { BigNumber } from 'ethers'

declare global {
  interface Window {
    ethereum: EthereumProvider
  }
}

declare type EthereumProvider = import('ethers').providers.ExternalProvider

interface EthereumBlock {
  hash: string
  parentHash: string
  number: number
  timestamp: number
  nonce: string
  difficulty: number
  _difficulty: BigNumber
  gasLimit: BigNumber
  gasUsed: BigNumber
  miner: string
  extraData: string
  transactions: string[]
}

declare type Block = EthereumBlock
