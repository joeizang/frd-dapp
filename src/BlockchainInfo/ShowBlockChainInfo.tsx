import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { DappContext } from '../DappContext'
import { useContext } from 'react'
import ConnectButton from '../Connectdapp/ConnectButton'

export function ShowBlockChainInfo() {
  const { provider } = useContext(DappContext)
  return (
    <>
      <Box
        sx={{
          border: '2px solid #cdc',
          borderRadius: 3,
          marginTop: 5,
          padding: 3,
        }}
        display={'flex'}
        justifyContent={'space-between'}
      >
        {/* <Box display={'flex'} alignItems={'center'}>
          <Box component={'span'}>
            <Typography variant={'h5'}>User Account :</Typography>
          </Box>
          <Box component={'span'} ml={3} pt={1}>
            <Typography variant={'h6'}>{walletAddress}</Typography>
          </Box>
        </Box> */}
        <Box>
          <Box>
            <Typography variant={'h6'}>Last Block Number :</Typography>
          </Box>
          <Box mr={3} pt={1}>
            <Typography variant={'h6'}>
              {provider && provider._lastBlockNumber}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
