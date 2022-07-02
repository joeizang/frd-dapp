import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
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
  const [showSuccessSnackbar, toggleSuccessSnackbar] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>(
    new ethers.providers.Web3Provider(window.ethereum),
  )
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>(
    provider.getSigner(),
  )
  const [contract] = useState(
    new ethers.Contract(daiAddress, abi, provider).connect(provider),
  )
  const checkNetworkChainId = async (p: ethers.providers.Web3Provider) => {
    const network = await p.getNetwork()
    if (network && network.chainId !== 1 && network.name !== 'homestead') {
      toggleShowSnackbar(true)
    }
  }
  const connectToMetamask = async () => {
    const getAccount = await provider.send('eth_requestAccounts', [])

    setProvider(provider)
    setSigner(signer)
    setWalletAddress(getAccount[0])
    await checkNetworkChainId(provider)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return
    }
    toggleSuccessSnackbar(false)
    toggleShowSnackbar(false)
  }
  console.log({ contract })
  return (
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

        <Snackbar open={showSuccessSnackbar} autoHideDuration={5000}>
          <Alert severity={'success'} onClose={handleClose}>
            <Typography variant={'button'} sx={{ padding: 3 }}>
              You do have Metamask, WHOOOO!!!
            </Typography>
          </Alert>
        </Snackbar>
      </Container>
    </DappContext.Provider>
  )
}

export default App
