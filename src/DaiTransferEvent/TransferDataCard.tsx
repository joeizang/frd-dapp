import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import PaidIcon from '@mui/icons-material/Paid'
import GridViewIcon from '@mui/icons-material/GridView'
import TagIcon from '@mui/icons-material/Tag'
import { TransferShape } from './DaiTransferEvent'
import { ethers } from 'ethers'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'

interface TransferDataProps {
  payload: TransferShape
}

export default function TransferDataCard({ payload }: TransferDataProps) {
  return (
    <Paper sx={{ marginTop: 3, width: 280, bgcolor: '#8E6713' }} elevation={5}>
      <List sx={{ bgColor: '#8E6713' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#B7352D' }}>
              <TagIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={payload.transactionHash.substring(0, 12)}
            secondary={'Transaction Hash'}
            primaryTypographyProps={{ fontWeight: 'bold', color: 'whitesmoke' }}
            secondaryTypographyProps={{
              fontWeight: 'bold',
              color: 'whitesmoke',
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#627313' }}>
              <PaidIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${ethers.utils.formatEther(payload.args[2])}`}
            secondary={'Tokens transferred For'}
            primaryTypographyProps={{ fontWeight: 'bold', color: 'whitesmoke' }}
            secondaryTypographyProps={{
              fontWeight: 'bold',
              color: 'whitesmoke',
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#215caf' }}>
              <GridViewIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={payload.blockNumber}
            secondary={'Block Number'}
            primaryTypographyProps={{ fontWeight: 'bold', color: 'whitesmoke' }}
            secondaryTypographyProps={{
              fontWeight: 'bold',
              color: 'whitesmoke',
            }}
          />
        </ListItem>
      </List>
    </Paper>
  )
}
