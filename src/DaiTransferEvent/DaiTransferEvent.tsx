import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DappContext } from '../DappContext'
import { useContext, useEffect } from 'react'
import { ethers } from 'ethers'

const daiaddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
const abi = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]
export function DaiTransferEvent() {
  const { provider } = useContext(DappContext)
  const contract = new ethers.Contract(
    daiaddress,
    abi,
    new ethers.providers.Web3Provider(window.ethereum),
  )

  useEffect(() => {
    console.log('ran')
  }, [])

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
        <Box display={'flex'}>
          <Typography variant={'h5'}>DAI Token address :</Typography>
          <Typography variant={'h6'}>{daiaddress}</Typography>
        </Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </>
  )
}
