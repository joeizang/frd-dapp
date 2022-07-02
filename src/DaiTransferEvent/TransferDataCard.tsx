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
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface TransferDataProps {
  payload: TransferShape
}

export default function TransferDataCard({ payload }: TransferDataProps) {
  return (
    <Card sx={{ marginTop: 3, width: 250 }} elevation={5}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ width: 24, height: 24, bgcolor: '#B7352D' }}>
                <TagIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={payload.transactionHash.substring(0, 12)}
              secondary={'Transaction Hash'}
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
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
