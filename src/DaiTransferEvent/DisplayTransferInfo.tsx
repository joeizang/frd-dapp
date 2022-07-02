import { useContext, useEffect, useState } from 'react'
import { TransferShape } from './DaiTransferEvent'
import TransferDataCard from './TransferDataCard'
import { DappContext } from '../DappContext'
import Grid from '@mui/material/Grid'

export default function DisplayTransferInfo() {
  const [transferData, setTransferData] = useState<TransferShape[]>([])
  const { contract } = useContext(DappContext)
  useEffect(() => {
    contract.on(
      'Transfer',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any, obj: any, amount: any, eventData: TransferShape) => {
        setTransferData([eventData, ...transferData])
      },
    )

    return () => {
      contract.removeAllListeners('Transfer')
    }
  }, [contract, transferData])
  return (
    <>
      <Grid container spacing={2} direction={'row'}>
        {transferData && transferData.length > 0
          ? transferData.map((data, idx) => (
              <Grid item key={idx}>
                <TransferDataCard payload={data} />
              </Grid>
            ))
          : null}
      </Grid>
    </>
  )
}
