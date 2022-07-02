/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DappContext } from '../DappContext'
import { useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import DisplayTransferInfo from './DisplayTransferInfo'
import Avatar from '@mui/material/Avatar'
import DaiLogo from './DaiLogo'

export interface TransferShape {
  address: string
  args: any[]
  blockHash: string
  blockNumber: number
  data: string
  decode: any
  event: string
  eventSignature: string
  logIndex: number
  transactionHash: string
  transactionIndex: number
  topics: string[]
}

export function DaiTransferEvent() {
  const { contract, daiAddress } = useContext(DappContext)
  const [contractName, setContractName] = useState()
  useEffect(() => {
    const run = async () => {
      const name = await contract.name()
      setContractName(name)
    }
    run()
  }, [contract])

  return (
    <>
      <Box
        sx={{
          border: '2px solid #cdc',
          borderRadius: 3,
          marginTop: 3,
          padding: 2,
        }}
      >
        <Box display={'flex'} justifyContent={'center'}>
          <Typography paddingBottom={3} variant={'h5'}>
            Transfer Event Summary
          </Typography>
        </Box>
        <Box mb={3} display={'flex'} justifyContent={'space-between'}>
          <Paper
            sx={{
              borderRadius: 5,
              display: 'flex',
              padding: 2,
              alignItems: 'center',
            }}
            elevation={5}
          >
            <Typography variant={'h5'}>DAI Token address :</Typography>
            <Typography variant={'h6'} ml={3}>
              {daiAddress}
            </Typography>
          </Paper>
          <Paper
            sx={{
              alignItems: 'center',
              display: 'flex',
              padding: 3,
              borderRadius: 5,
            }}
            elevation={5}
          >
            <Avatar>
              <DaiLogo />
            </Avatar>
            <Typography variant={'h6'} sx={{ marginLeft: 3 }}>
              {contractName}
            </Typography>
          </Paper>
        </Box>
        <Box
          overflow={'scroll'}
          maxHeight={450}
          p={1}
          sx={{ overflowX: 'hidden' }}
        >
          <DisplayTransferInfo />
        </Box>
      </Box>
    </>
  )
}
