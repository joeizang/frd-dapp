/// <reference types="vite/client" />

interface Window {
  ethereum: EthereumProvider
}

declare type EthereumProvider = import('ethers').providers.ExternalProvider
