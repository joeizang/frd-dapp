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
import BlockNumber from './BlockNumber'
import Paper from '@mui/material/Paper'

export function ShowBlockChainInfo() {
  const { provider } = useContext(DappContext)
  const [blockNumber, setBlockNumber] = useState<number>(0)
  const [blockInfo, setBlockInfo] = useState<Block>()

  const getBlockInfo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (block: any) => {
      return await provider.getBlock(block)
    },
    [provider],
  )

  useEffect(() => {
    setInterval(async () => {
      const blknos = await provider.getBlockNumber()
      setBlockNumber(blknos)
    }, 5000)
    getBlockInfo(blockNumber).then((result) => setBlockInfo(result))
  }, [blockNumber, getBlockInfo, provider])
  return (
    <>
      <Box
        sx={{
          border: '2px solid #cdc',
          borderRadius: 3,
          marginTop: 15,
          padding: 3,
        }}
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Paper
          sx={{
            padding: 3,
            borderRadius: 5,
            bgcolor: '#007894',
            color: 'whitesmoke',
            marginBottom: 3,
          }}
          elevation={5}
        >
          <Box component={'span'}>
            <Typography variant={'h5'}>Block Information :</Typography>
          </Box>
          <Box ml={3} pt={1}>
            {blockInfo && Object.keys(blockInfo).length > 0 ? (
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#215CAF' }}>
                      <EngineeringIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={blockInfo.miner}
                    secondary="Miner"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{
                      fontWeight: 'bold',
                      color: 'whitesmoke',
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#007894' }}>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${new Date(blockInfo.timestamp * 1000)}`}
                    secondary="Timestamp"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{
                      fontWeight: 'bold',
                      color: 'whitesmoke',
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#A30774' }}>
                      <AccessTimeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={blockInfo.nonce}
                    secondary="Nonce"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{
                      fontWeight: 'bold',
                      color: 'whitesmoke',
                    }}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#8E6713' }}>
                      <ReceiptLongIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={blockInfo.transactions.length}
                    secondary="Number of Transactions"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{
                      fontWeight: 'bold',
                      color: 'whitesmoke',
                    }}
                  />
                </ListItem>
              </List>
            ) : null}
          </Box>
        </Paper>
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 3,
            height: '50px',
            borderRadius: 5,
            bgcolor: '#007894',
            color: 'whitesmoke',
          }}
          elevation={5}
        >
          <Box>
            <Typography variant={'h6'}>Last Block Number :</Typography>
          </Box>
          <BlockNumber blockNumber={blockNumber} />
        </Paper>
      </Box>
    </>
  )
}
