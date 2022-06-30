import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { ShowBlockChainInfo } from './BlockchainInfo'
import { DappContext } from './DappContext'
import { ethers } from 'ethers'

function App() {
  const [showSnackbar, toggleShowSnackbar] = useState<boolean>(false)
  const [showSuccessSnackbar, toggleSuccessSnackbar] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >()
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >()

  const connectToMetamask = async () => {
    console.log({ metamask: window.ethereum })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const getAccount = await provider.send('eth_requestAccounts', [])
    console.log({ getAccount })
    const signer = provider.getSigner()
    setProvider(provider)
    setSigner(signer)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      console.log({ reason })
      return
    }
    toggleSuccessSnackbar(false)
    toggleShowSnackbar(false)
  }

  return (
    <DappContext.Provider value={{ provider, signer, walletAddress }}>
      <Container>
        <Box>
          {/* <Button
          size={'large'}
          variant={'contained'}
          sx={{ borderRadius: '50%', padding: 5 }}
          onClick={connectToMetamask}
        >
          <Typography variant={'button'}>Connect to Metamask</Typography>
        </Button> */}
          <ShowBlockChainInfo />
        </Box>

        <Snackbar open={showSnackbar} autoHideDuration={5000}>
          <Alert severity={'error'} onClose={handleClose}>
            <Typography variant={'button'} sx={{ padding: 3 }}>
              You do not have Metamask installed in your browser
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
