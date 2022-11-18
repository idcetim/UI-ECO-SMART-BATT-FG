import * as React from 'react'
import FileUploadButton from '../components/UploadFileButton'
import Papa from 'papaparse'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Modal from 'react-bootstrap/Modal';
import { getLote, getLotes } from '../api/endpoints';

const GestionStock = () => {
    const [lotesData, setLotesData] = React.useState([])
    const [lotesArchivo, setLotesArchivo] = React.useState([])

    React.useEffect(() => {
        const callback = async () => setLotesData(await (await fetch(getLotes)).json())

        callback()
    }, [])

    React.useEffect(() => {
        console.log(lotesData)
    }, [lotesData])

    const handleFileChange = async (e) => {
        let newLotesData = []

        if (e.target !== null && e.target.files.length > 0) {
            for (const file of e.target.files) {
                const fileExtension = file?.type.split("/")[1]

                if (["csv"].includes(fileExtension)) {
                    newLotesData = newLotesData.concat(await getLotesDeFichero(file))
                }
            }
        }

        if (newLotesData.length > 0) {
            setLotesArchivo(newLotesData)
        }
    }

    const Lotes = () => {
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

        const columns = [
            { id: 'codigo', label: 'Codigo', minWidth: 170 },
            { id: 'fecha', label: 'Fecha', minWidth: 170 },
            { id: 'origen', label: 'Origen', minWidth: 170 },
            { id: 'cantidad', label: 'Cantidad', minWidth: 170 },
            { id: 'calidad', label: 'Calidad', minWidth: 170 },
            { id: 'analisis', label: 'Analisis', minWidth: 170 }
        ]

        return (
            <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: '90%', marginTop: '40px' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lotesData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={lotesData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

    const FileParsed = (props) => {
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

                        <TableBody>{props.lotesData.map((lote) => <Row key={lote.tag} lote={lote} />)}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }

    const Row = (props) => {
        const [modalDisplayed, setModalDisplayed] = React.useState(false)

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

                {modalDisplayed ? <LoteModal lote={props.lote} hideModal={() => setModalDisplayed(false)} /> : null}
            </>
        )
    }

    const LoteModal = (props) => {
        const [loteInfo, setLoteInfo] = React.useState(null)

        React.useEffect(() => {
            const callback = async () => setLoteInfo(await (await fetch(`${getLote}?codigoLote=${props.lote.tag}`)).json())

            callback()
        }, [])

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
                                        <a href={loteInfo?.analisis} target='_blank'>{loteInfo?.analisis}</a>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FileUploadButton handleFileUpload={handleFileChange} title={'Leer lotes de fichero'} />

            {
                lotesArchivo.length > 0 ?
                    <FileParsed lotesData={lotesArchivo} />
                    :
                    <Lotes />
            }
        </div>
    )
}

const getLotesDeFichero = async (file) => {
    return await new Promise((resolve, reject) => {
        let lotesData = []
        const reader = new FileReader()

        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target?.result)
            const parsedData = csv?.data?.slice(6)

            for (const element of parsedData) {
                if (element.length == 3 && Math.abs(Number(element[2])) < 50 && element[0].length < 24) {
                    lotesData.push({
                        tag: element[0],
                        count: Number(element[1]),
                        rssi: Number(element[2])
                    })
                }
            }
            resolve(lotesData)
        }

        reader.readAsText(file)
    })
}

export default GestionStock