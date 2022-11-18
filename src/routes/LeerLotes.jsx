import Papa from 'papaparse'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from 'react-bootstrap/Modal';
import { getLote } from '../api/endpoints';

// interface ILote {
//     tag: string
//     count: number
//     rssi: number
// }

// interface ILoteInfo {
//     codigo: string
//     fecha: stringI
//     origen: string
//     cantidad: number
//     calidad: string
//     analisis: string
// }

const LeerLotes = () => {
    const [lotesData, setLotesData] = React.useState([])

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
            setLotesData(newLotesData)
        }
    }

    const FileParsed = (props) => {
        return (
            <div style={{ width: '90%', maxWidth: '700px', marginTop: '40px' }}>
                <ArrowBackIcon
                    style={{ fontSize: '40px', marginBottom: '20px', cursor: 'pointer' }}
                    onClick={() => {
                        setLotesData([])
                    }}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tag</TableCell>
                                <TableCell align="right">Count</TableCell>
                                <TableCell align="right">RSSI</TableCell>
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
            const callback = async () => {
                setLoteInfo(await (await fetch(`${getLote}?codigoLote=${props.lote.tag}`)).json())
            }

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
            {
                lotesData.length > 0 ?
                    <FileParsed lotesData={lotesData} />
                    :
                    <input
                        type='file'
                        onChange={handleFileChange}
                        multiple
                    />
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

export default LeerLotes