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

interface ILote {
    tag: string
    count: number
    rssi: number
}

interface ILoteInfo {
    codigo: string
    fecha: string
    origen: string
    cantidad: number
    calidad: string
    analisis: string
}

const LeerLotes = () => {
    const [lotesData, setLotesData] = React.useState<ILote[]>([])
    const [error, setError] = React.useState("")

    const handleFileChange = (e: any) => {
        setError("")

        if (e.target.files.length > 0) {
            const inputFile = e.target.files[0]
            const fileExtension = inputFile?.type.split("/")[1]

            if (!["csv"].includes(fileExtension)) {
                setError("El archivo debe ser csv")

                return
            }

            const reader = new FileReader()

            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target?.result as any)
                const parsedData = csv?.data?.slice(6) as string[]

                let newData: ILote[] = []

                for (const element of parsedData) {
                    if (element.length == 3 && Math.abs(Number(element[2])) < 50 && element[0].length < 24) {
                        newData.push({
                            tag: element[0],
                            count: Number(element[1]),
                            rssi: Number(element[2])
                        })
                    }
                }

                if (newData.length > 0) {
                    setLotesData(newData)
                }
            }

            reader.readAsText(inputFile)
        }
    }

    const FileUpload = () => {
        return (
            <input
                type='file'
                onChange={handleFileChange}
            />
        )
    }

    const FileParsed = (_props: { lotesData: ILote[] }) => {
        const Row = (props: { lote: ILote }) => {
            const [modalDisplayed, setModalDisplayed] = React.useState(false)

            const LoteModal = () => {
                const [loteInfo, setLoteInfo] = React.useState<ILoteInfo | null>(null)

                React.useEffect(() => {

                }, [])

                return (
                    <Modal show={true} onHide={() => setModalDisplayed(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{props.lote.tag}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <TableContainer component={Paper}>
                                <Table sx={{ minwidth: 650 }} aria-label="simple table">
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
                                        <TableCell align='right'>{loteInfo?.analisis}</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </Modal.Body>
                    </Modal>
                )
            }

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

                    {modalDisplayed ? <LoteModal /> : null}
                </>
            )
        }

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
                        <TableBody>
                            {
                                _props.lotesData.map((lote) => <Row key={lote.tag} lote={lote} />)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
                lotesData.length > 0 ?
                    <FileParsed lotesData={lotesData} />
                    :
                    <FileUpload />
            }
        </div>
    )
}

export default LeerLotes