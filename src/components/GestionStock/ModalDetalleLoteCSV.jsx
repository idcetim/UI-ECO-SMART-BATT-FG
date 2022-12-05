import { useState, useEffect } from 'react'
import { getLote } from '../../api/endpoints'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'
import Modal from 'react-bootstrap/Modal';
export const ModalDetalleLoteCSV = (props) => {
  const [loteInfo, setLoteInfo] = useState(null)

  useEffect(() => {
    const callback = async () => setLoteInfo(await (await fetch(`${getLote}?codigoLote=${props?.lote?.tag}`)).json())

    callback()
  }, [props.lote.tag])

  return (
    <Modal show={true} onHide={() => props.hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{props.lote.tag}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <TableContainer component={Paper}>
          <Table sx={{ minwidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component={'th'} scope='row'>Código:</TableCell>
                <TableCell align='right'>{loteInfo?.codigo}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component={'th'} scope='row'>Fecha:</TableCell>
                <TableCell align='right'>{loteInfo?.fecha}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component={'th'} scope='row'>Origen:</TableCell>
                <TableCell align='right'>{loteInfo?.origen}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component={'th'} scope='row'>Cantidad:</TableCell>
                <TableCell align='right'>{loteInfo?.cantidad}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component={'th'} scope='row'>Calidad:</TableCell>
                <TableCell align='right'>{loteInfo?.calidad}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell component={'th'} scope='row'>Análisis:</TableCell>
                <TableCell align='right'>
                  <a href={loteInfo?.analisis} target='_blank' rel="noreferrer">{loteInfo?.analisis}</a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Modal.Body>
    </Modal>
  )
}