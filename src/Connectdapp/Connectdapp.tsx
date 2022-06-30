import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ConnectButton from './ConnectButton'
import { DappContext } from '../DappContext'
import { useContext } from 'react'

export function Connectdapp() {
  const { walletAddress } = useContext(DappContext)
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        sx={{
          border: '2px solid #cdc',
          borderRadius: 3,
          marginTop: 10,
          padding: 3,
        }}
      >
        <Box display={'flex'}>
          <Typography variant={'h5'}>User Account :</Typography>
          <Typography variant={'h6'}>{walletAddress}</Typography>
        </Box>
        <Box></Box>
        <ConnectButton />
      </Box>
    </>
  )
}
