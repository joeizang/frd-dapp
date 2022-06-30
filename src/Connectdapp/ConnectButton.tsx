import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DappContext } from '../DappContext'
import { useContext, useState } from 'react'

/**
 * What do I need to do in this button?
 * 1. when clicked, the button should connect to the blockchain via metamask
 * 2. when the connection is successful, then user address should be returned
 * and other bits of info needed by parent to display info about current user
 * 3. while the negotiation between metamask and the dapp is happening, the
 * button should be disabled
 * 4. while the negotiation is happening, there should be a spinner going round
 * the inside of the button.
 * 5. When negotiation is complete and successful, the text should change and
 * show Disconnect and it should disconnect from metamask when clicked
 */

function ConnectButton() {
  const [buttonText, setButtonText] = useState<string>('Connect')
  const { connectToMetamask } = useContext(DappContext)
  return (
    <>
      <Button
        variant={'contained'}
        sx={{
          borderRadius: '50%',
          width: 100,
          height: 100,
          padding: 3,
        }}
        onClick={connectToMetamask}
      >
        <Typography variant={'button'} fontWeight={'bold'}>
          {buttonText}
        </Typography>
      </Button>
    </>
  )
}

export default ConnectButton
