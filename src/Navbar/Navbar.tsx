import Appbar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export function Navbar() {
  return (
    <>
      <Appbar elevation={2}>
        <Toolbar>
          <Box>
            <Typography variant={'h6'} fontWeight={'bold'}>
              Frontend Developer Role Task
            </Typography>
          </Box>
        </Toolbar>
      </Appbar>
    </>
  )
}
