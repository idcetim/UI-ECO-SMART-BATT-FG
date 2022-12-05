import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper } from '@mui/material'
export const Resumen = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
      <h3>Cantidad de botellas en stock</h3>

      <TableContainer component={Paper} sx={{ width: '300px', marginTop: '10px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Calidad</TableCell>
              <TableCell align='right'>Cantidad</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>2N</TableCell>
              <TableCell align='right'>10000 kg</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component='th' scope='row'>3N</TableCell>
              <TableCell align='right'>20000 kg</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component='th' scope='row'>4N</TableCell>
              <TableCell align='right'>50000 kg</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component='th' scope='row'>5N</TableCell>
              <TableCell align='right'>50000 kg</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}