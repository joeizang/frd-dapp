import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DappContext } from '../DappContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Block } from 'vite-env'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import EngineeringIcon from '@mui/icons-material/Engineering'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { ethers } from 'ethers'

export function ShowBlockChainInfo() {
  const { provider } = useContext(DappContext)
  const [blockNumber, setBlockNumber] = useState<number>(0)
  const [blockInfo, setBlockInfo] = useState<Block>()

  const getBlockInfo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (block: any) => {
      provider.ge
      return await provider.getBlock(block)
    },
    [provider],
  )

  useEffect(() => {
    // const run = async () => {
    //   const blknos = await provider.getBlockNumber()
    //   setBlockNumber(blknos)
    // }
    // const getInfo = async () => {
    //   await run()
    //   setBlockInfo(await getBlockInfo(blockNumber))
    // }
    setInterval(async () => {
      const blknos = provider.getBlockNumber().then((result: number) => {
        return result
      })
      setBlockNumber(await blknos)
    }, 5000)
    getBlockInfo(blockNumber).then((result) => setBlockInfo(result))
  }, [blockNumber, getBlockInfo, provider])
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
        <Box display={'flex'} alignItems={'center'}>
          <Box component={'span'}>
            <Typography variant={'h5'}>Block Information :</Typography>
          </Box>
          <Box ml={3} pt={1}>
            {blockInfo && Object.keys(blockInfo).length > 0 ? (
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EngineeringIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={blockInfo.miner} secondary="Miner" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${new Date(blockInfo.timestamp * 1000)}`}
                    secondary="Timestamp"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccessTimeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={blockInfo.nonce} secondary="Nonce" />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ReceiptLongIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={blockInfo.transactions.length}
                    secondary="Number of Transactions"
                  />
                </ListItem>
              </List>
            ) : null}
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Box>
            <Typography variant={'h6'}>Last Block Number :</Typography>
          </Box>
          <Box ml={3}>
            <Typography variant={'h6'}>{blockNumber}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
