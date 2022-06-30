import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { DappContext } from '../DappContext'
import { useContext } from 'react'
import ConnectButton from './ConnectButton'

export function ShowBlockChainInfo() {
  const { walletAddress } = useContext(DappContext)
  return (
    <>
      <Box
        sx={{
          border: '2px solid #cdc',
          borderRadius: 3,
          marginTop: 10,
          padding: 3,
        }}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Box>
          <Box component={'span'}>
            <Typography variant={'h4'}>User Account :</Typography>
          </Box>
          <Box component={'span'}>
            <Typography>{walletAddress}</Typography>
          </Box>
        </Box>
        <Box></Box>
        <ConnectButton />
      </Box>
    </>
  )
}
