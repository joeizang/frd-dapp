import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

interface BlockNumberProps {
  blockNumber: number
}

export default function BlockNumber({ blockNumber }: BlockNumberProps) {
  return (
    <Box ml={3}>
      <Typography variant={'h6'}>{blockNumber}</Typography>
    </Box>
  )
}
