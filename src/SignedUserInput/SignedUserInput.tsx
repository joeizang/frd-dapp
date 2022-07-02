import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DappContext } from '../DappContext'
import { BaseSyntheticEvent, useContext, useState } from 'react'

export function SignedUserInput() {
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState('')
  const { signer, connectToMetamask } = useContext(DappContext)

  const signMessage = async (msg: string) => {
    if (message && message.length > 3) {
      await connectToMetamask()
      setSignedMessage(await signer.signMessage(msg))
    }
  }

  const handleSigning = (evt: BaseSyntheticEvent) => {
    setMessage(evt.target.value)
  }
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
        <Paper
          elevation={5}
          sx={{
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            padding: 3,
          }}
        >
          <FormControl sx={{ width: '50vw' }}>
            <TextField
              variant="standard"
              value={message}
              onChange={(evt) => handleSigning(evt)}
              label={'Message'}
            />
          </FormControl>
          <Button
            variant={'contained'}
            sx={{ width: 60, height: 60, borderRadius: '50%', marginLeft: 5 }}
            type={'submit'}
            onClick={() => signMessage(message)}
          >
            <Typography variant={'button'}>Sign</Typography>
          </Button>
        </Paper>
        <Paper
          elevation={5}
          sx={{
            marginTop: 5,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 5,
            overflow: 'auto',
            bgcolor: '#6F6F6F',
          }}
        >
          <Typography
            flexWrap={'wrap'}
            variant={'body1'}
            fontWeight={'bold'}
            color={'whitesmoke'}
          >
            {signedMessage}
          </Typography>
        </Paper>
      </Box>
    </>
  )
}
