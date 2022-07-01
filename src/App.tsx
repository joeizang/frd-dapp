import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { ShowBlockChainInfo } from './BlockchainInfo'
import { DappContext } from './DappContext'
import { ethers } from 'ethers'
import { Connectdapp } from './Connectdapp'
import { DaiTransferEvent } from './DaiTransferEvent'
import { Navbar } from './Navbar'

function App() {
  const [showSnackbar, toggleShowSnackbar] = useState<boolean>(false)
  const [showSuccessSnackbar, toggleSuccessSnackbar] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>(
    {} as ethers.providers.Web3Provider,
  )
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>(
    {} as ethers.providers.JsonRpcSigner,
  )

  const checkNetworkChainId = async (p: ethers.providers.Web3Provider) => {
    const network = await p.getNetwork()
    if (network && network.chainId !== 1 && network.name !== 'homestead') {
      toggleShowSnackbar(true)
    }
  }
  // console.log(provider.provider.host)
  const connectToMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const getAccount = await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()

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

  return (
    <DappContext.Provider
      value={{ connectToMetamask, provider, signer, walletAddress }}
    >
      <Container>
        <Navbar />
        <Box>
          <Connectdapp />
          <ShowBlockChainInfo />
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
