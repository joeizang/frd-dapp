import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { ShowBlockChainInfo } from './BlockchainInfo'
import { DappContext } from './DappContext'
import { ethers } from 'ethers'
import { DaiTransferEvent } from './DaiTransferEvent'
import { Navbar } from './Navbar'
import { SignedUserInput } from './SignedUserInput'

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
const abi = [
  // Read-Only Functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',

  // Get the account balance
  'function balanceOf(address) view returns (uint)',

  // Send some of your tokens to someone else
  'function transfer(address to, uint amount)',

  // An event triggered whenever anyone transfers to someone else
  'event Transfer(address indexed from, address indexed to, uint amount)',
]
function App() {
  const [showSnackbar, toggleShowSnackbar] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>(
    new ethers.providers.Web3Provider(window.ethereum),
  )
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>(
    new ethers.providers.Web3Provider(window.ethereum).getSigner(),
  )
  const [contract, setContract] = useState(
    new ethers.Contract(daiAddress, abi, provider).connect(provider),
  )

  const checkNetworkChainId = useCallback(async () => {
    const network = await provider.getNetwork()
    if (network && network.chainId !== 1 && network.name !== 'homestead') {
      toggleShowSnackbar(true)
    }
  }, [provider])

  useEffect(() => {
    const eth = window.ethereum

    if (eth === undefined) {
      toggleShowSnackbar(true)
    }
  }, [])

  useEffect(() => {
    const run = async () => {
      await checkNetworkChainId()
    }
    run()
  }, [checkNetworkChainId])

  useEffect(() => {
    window.ethereum.on('chainChanged', (chainId: any) => {
      window.location.reload()
    })
    return () => {
      window.ethereum.removeListener('chainChanged', (chainId: any) => {
        console.log('removed!!')
      })
    }
  }, [])

  const connectToMetamask = async () => {
    const getAccount = await provider.send('eth_requestAccounts', [])
    setWalletAddress(getAccount[0])
    await checkNetworkChainId()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return
    }
    toggleShowSnackbar(false)
  }

  return (
    <>
      {showSnackbar === true ? (
        <Container>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity={'error'} onClose={handleClose}>
              <Typography variant={'button'} sx={{ padding: 3 }}>
                You must be on Ethereum mainnet for the application to work!!
              </Typography>
            </Alert>
          </Snackbar>
        </Container>
      ) : (
        <DappContext.Provider
          value={{
            connectToMetamask,
            contract,
            daiAddress,
            provider,
            signer,
            walletAddress,
          }}
        >
          <Container>
            <Navbar />
            <Box>
              <ShowBlockChainInfo />
              <SignedUserInput />
              <DaiTransferEvent />
            </Box>

            <Snackbar
              open={showSnackbar}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <Alert severity={'error'} onClose={handleClose}>
                <Typography variant={'button'} sx={{ padding: 1 }}>
                  You are not connected to mainnet via Metamask.
                </Typography>
              </Alert>
            </Snackbar>
          </Container>
        </DappContext.Provider>
      )}
    </>
  )
}

export default App
