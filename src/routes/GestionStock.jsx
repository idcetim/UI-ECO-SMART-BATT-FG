import React from 'react'
import FileUploadButton from '../components/UploadFileButton'
import Papa from 'papaparse'
import Modal from 'react-bootstrap/Modal';
import { getLote, getLotes, updateLote } from '../api/endpoints';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Tabs,
    Tab,
    Skeleton
} from '@mui/material'
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'

const GestionStock = () => {
    const [currentTab, setCurrentTab] = React.useState(0)

    const tabChanged = (event, newValue) => {
        setCurrentTab(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs
                    value={currentTab}
                    onChange={tabChanged}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    // sx={{
                    //     '& .MuiTabs-flexContainer': {
                    //         flexWrap: 'wrap',
                    // }}} 
                >
                    <Tab label="Materias primas" {...a11yProps(0)} />
                    <Tab label="Productos" {...a11yProps(0)} />
                    <Tab label="Resumen" {...a11yProps(0)} />
                </Tabs>
            </Box>

            <TabPanel value={currentTab} index={0}>
                <GestionStockListaLotes />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
                <GestionStockListaLotes />
            </TabPanel>

            <TabPanel value={currentTab} index={2}>
                <Resumen />
            </TabPanel>
        </Box>
    )
}

const Resumen = () => {
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

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const GestionStockListaLotes = () => {
    const [lotesBD, setLotesBD] = React.useState(null)
    const [lotesCSV, setLotesCSV] = React.useState([])
    const [errorLoadingLotes, setErrorLoadingLotes] = React.useState(false)

    React.useEffect(() => {
        const callback = async () => {
            try {
                const response = await fetch(getLotes)

                if (response.ok) {
                    setLotesBD(await response.json())
                }
                else {
                    setErrorLoadingLotes(true)
                }
            }
            catch {
                setErrorLoadingLotes(true)
            }
        }

        callback()
    }, [])

    const handleFileChange = async (e) => {
        let newLotesData = []

        if (e.target !== null && e.target.files.length > 0) {
            for (const file of e.target.files) {
                const fileExtension = file?.type.split("/")[1]

                if (["csv"].includes(fileExtension)) {
                    newLotesData = newLotesData.concat(await readLotesFromCSV(file))
                }
            }
        }

        if (newLotesData.length > 0) {
            setLotesCSV(newLotesData)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5%' }}>
                <FileUploadButton
                    handleFileUpload={handleFileChange}
                    title={'Leer lotes de fichero'}
                    callback={() => setLotesCSV([])}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    lotesCSV.length > 0 ?
                        <TablaLotesCSV lotesData={lotesCSV} />
                        :
                        <TablaLotesBD lotesBD={lotesBD} errorLoadingLotes={errorLoadingLotes} />
                }
            </div>
        </div>
    )
}

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    )
}

const TablaLotesBD = (props) => {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    React.useEffect(() => {
        if (props.lotesBD != null) {
            setRows(props.lotesBD)
        }
    }, [props.lotesBD])

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        fetch(updateLote, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRow)
        })

        return updatedRow;
    };

    const columns = [
        { field: 'codigo', headerName: 'Código', width: 180, editable: true },
        { field: 'fecha', headerName: 'Fecha', width: 100, editable: true },
        { field: 'origen', headerName: 'Origen', width: 100, editable: true },
        { field: 'cantidad', headerName: 'Cantidad', width: 100, type: 'string', editable: true },
        { field: 'calidad', headerName: 'Calidad', width: 100, editable: true },
        { field: 'analisis', headerName: 'Análisis', width: 350, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 700,
                width: '1050px',
                maxWidth: '90%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                marginTop: '20px',
                marginBottom: '40px'
            }}
        >
            <DataGrid
                rows={rows}
                rowsPerPageOptions={[10, 25, 50, 100]}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    pagination: {
                        pageSize: 10
                    }
                }}
                loading={props.lotesBD == null}
                error={props.errorLoadingLotes == true ? true : undefined}
                components={{
                    Toolbar: CustomToolbar
                }}
            />
        </Box>
    );
}

const TablaLotesCSV = (props) => {
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

            {modalDisplayed ? <ModalDetalleLoteCSV lote={props.lote} hideModal={() => setModalDisplayed(false)} /> : null}
        </>
    )
}

const ModalDetalleLoteCSV = (props) => {
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

const  readLotesFromCSV = async (file) => {
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