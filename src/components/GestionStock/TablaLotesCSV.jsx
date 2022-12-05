import { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { ModalDetalleLoteCSV } from './ModalDetalleLoteCSV'

export const TablaLotesCSV = (props) => {
  return (
    <div style={{ width: '90%', maxWidth: '700px', marginTop: '40px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Tag</b></TableCell>
              <TableCell align="right"><b>Count</b></TableCell>
              <TableCell align="right"><b>RSSI</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{props.lotesData.map((lote) => <FilaLotesCSV key={lote.tag} lote={lote} />)}</TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


const FilaLotesCSV = (props) => {
  const [modalDisplayed, setModalDisplayed] = useState(false)

  return (
    <>
      <TableRow
        hover
        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
        onClick={() => setModalDisplayed(true)}
      >
        <TableCell component='th' scope='row'>{props.lote.tag}</TableCell>
        <TableCell align='right'>{props.lote.count}</TableCell>
        <TableCell align='right'>{props.lote.rssi}</TableCell>
      </TableRow>

      {modalDisplayed ? <ModalDetalleLoteCSV lote={props.lote} hideModal={() => setModalDisplayed(false)} /> : null}
    </>
  )
}