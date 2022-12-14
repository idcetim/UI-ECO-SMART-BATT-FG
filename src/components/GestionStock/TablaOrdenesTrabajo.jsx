import { useState, useEffect } from 'react'
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    useGridApiContext
} from '@mui/x-data-grid';
import {
    Button,
    DialogTitle,
    Dialog,
    DialogActions,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'
import { ordenesTrabajoEndpoints } from '../../api/endpoints'
import { Box } from '@mui/system';
import { getObjIdToCalidad, getObjIdToProceso, getObjIdToTamaño } from '../../helpers/api';
import '../../styles/stockTables.css'
import toast, { Toaster } from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { validarOrdenTrabajo } from '../../helpers/validadores';
import { IconButton } from '@mui/material';
import {botonesEditarYEleminarDisabled} from '../../helpers/mensajes'
import WarningModal from '../WarningModal'

const isValidUrl = urlString => {
    try {
        return Boolean(new URL(urlString));
    }
    catch (e) {
        return false;
    }
}

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    )
}

export const TablaOrdenesTrabajo = ({ ordenesTrabajo, errorLoadingOrdenesTrabajo, rol }) => {
    const [rows, setRows] = useState([])
    const [rowModesModel, setRowModesModel] = useState({});
    const [procesos, setProcesos] = useState({})
    const [deleteState, setDeleteState] = useState({
        idToDelete: null,
        modalOpen: false
    })
    const [openAlertModal, setOpenAlertModal] = useState({
        status: false,
        text: ''
    })

    useEffect(() => {
        getObjIdToProceso()
            .then(obj => setProcesos(obj))
    }, [])

    useEffect(() => {
        if (ordenesTrabajo !== null) {
            setRows(ordenesTrabajo)
        }
    }, [ordenesTrabajo])

    const getCodigoOrdenTrabajo = (id) => {
        if (ordenesTrabajo) {
            for (let orden of ordenesTrabajo) {
                if (orden.id == id) {
                    return orden.codigo
                }
            }
        }

        return null
    }

    const deleteOrdenTrabajo = id => {
        setDeleteState({ ...deleteState, modalOpen: false })

        let promise = new Promise((resolve, reject) => {
            fetch(`${ordenesTrabajoEndpoints.deleteOrdenTrabajo}?id=${id}`)
                .then(async(result) => {
                    if (result.ok) {
                        setRows(rows.filter((row) => row.id !== id))
                        resolve(result)
                    }

                    if ((await result.text()) === "Tiene descendientes") {
                        setOpenAlertModal({
                            status: true,
                            text: 'No es posible borrar ese elemento porque ya tiene productos asociados.'
                        })
                    }

                    reject(result)
                })
                .catch(error => reject(error))
        })

        toast.promise(promise, {
            loading: 'Eliminando orden...',
            success: 'Orden eliminada',
            error: 'Ha habido un error'
        },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    duration: 4000,
                    icon: '✅',
                },
            })
    }

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        if (rol !== 2) {
            return
        }

        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        if (rol !== 2) {
            return
        }

        setDeleteState({ idToDelete: id, modalOpen: true })
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

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };

        let resultadoValidacion = validarOrdenTrabajo(newRow)

        if (resultadoValidacion.errorValidacion) {
            alert(resultadoValidacion.errorValidacion)

            return
        }

        let promise = new Promise((resolve, reject) => {
            fetch(ordenesTrabajoEndpoints.updateOrdenTrabajo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRow)
            })
                .then(result => {
                    if (result.ok) {
                        resolve(result)
                    }

                    reject(result)
                })
                .catch(error => reject(error))
        })

        toast.promise(promise, {
            loading: 'Actualizando orden...',
            success: 'Orden actualizada',
            error: 'Ha habido un error'
        },
        {
            style: {
                minWidth: '250px',
            },
            success: {
                duration: 4000,
                icon: '✅',
            },
        }
        )

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        return updatedRow
    };

    const RenderFecha = (props) => {
        return (
            <div>{(new Date(props.row.fecha)).toLocaleDateString()}</div>
        )
    }

    const RenderEditFecha = props => {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();

        const handleValueChange = (newDate) => {
            apiRef.current.setEditCellValue({ id, field, value: `${newDate.$y}-${Number(newDate["$M"]) + 1}-${newDate["$D"]}` });
        };

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Fecha"
                    value={value}
                    inputFormat="DD/MM/YY"
                    onChange={handleValueChange}
                    renderInput={(params) => <TextField size="small" {...params} />}
                />
            </LocalizationProvider>
        )
    }

    const RenderProceso = (props) => {  
        if (props.row.procesosIds) {
            let procesosTexto = props.row.procesosIds.map(element => {
                return procesos[element]
            }).join(', ')
    
            return (
                <div>{procesosTexto}</div>
            )
        }

        return null
    }

    const RenderEditProceso = props => {
        const { id, value, field } = props
        const apiRef = useGridApiContext()

        const handleValueChange = event => {
            console.log(event.target.value)
            apiRef.current.setEditCellValue({ id, field, value: event.target.value })
        }

        return (
            <FormControl fullWidth>
                <Select 
                    value={value} 
                    multiple
                    onChange={handleValueChange}
                >
                    {procesos.ids.map(proceso => {
                        return <MenuItem value={proceso.id} key={proceso.id}>{procesos[proceso.id]}</MenuItem>
                    })}
                </Select>
            </FormControl>
        )
    }

    const RenderPerdidas = props => {
        if (props.row.cantidadProductos <= 0) {
            return "-"
        }

        let porcentajePerdidas = 100 - (props.row.cantidadProductos / props.row.cantidadMaterias) * 100

        return `${parseFloat(porcentajePerdidas.toFixed(2))} %`
    }


    const columns = [
        { field: 'codigo', headerName: 'Código', width: 130, editable: true },
        { field: 'fecha', headerName: 'Fecha', width: 130, editable: true, renderCell: RenderFecha, renderEditCell: RenderEditFecha },
        { field: 'cantidadMaterias', headerName: 'Cantidad (kg)', width: 130, editable: false, valueFormatter: (params) => {
            if (!isNaN(params.value)) {
                return parseFloat(params.value.toFixed(2)).toString()
            }

            return ''
        }},
        // { field: 'cantidadProductos', headerName: 'Perdidas', type: "number", width: 130, editable: false, renderCell: RenderPerdidas },
        { field: 'perdidasODisponible', headerName: 'Pérdidas (kg)', type: "number", width: 130, editable: false, valueFormatter: (params) => {
            if (!isNaN(params.value)) {
                return parseFloat(params.value.toFixed(2)).toString()
            }
        }},
        { field: 'procesosIds', headerName: 'Proceso', flex: 1, editable: true, renderCell: RenderProceso, renderEditCell: RenderEditProceso },
        { field: 'perdidas', headerName: 'Perdidas %', editable: false, align: 'right', renderCell: RenderPerdidas,
        },
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
                        icon={<Tooltip title={rol !== 2 ? botonesEditarYEleminarDisabled : ""}><EditIcon color={rol !== 2 ? "disabled" : "black"}  /></Tooltip>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title={rol !== 2 ? botonesEditarYEleminarDisabled : ""}><DeleteIcon color={rol !== 2 ? "disabled" : "black"} /></Tooltip>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }
        }
    ]

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
            <Toaster />
            <WarningModal setOpenAlertModal={setOpenAlertModal} openAlertModal={openAlertModal} />
            <Dialog
                open={deleteState.modalOpen}
                onClose={() => setDeleteState({ ...deleteState, modalOpen: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Se va a efectuar el borrado de la orden {getCodigoOrdenTrabajo(deleteState.idToDelete)}. ¿Quieres continuar?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteState({ ...deleteState, modalOpen: false })}>Cancelar</Button>
                    <Button onClick={() => deleteOrdenTrabajo(deleteState.idToDelete)} autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>

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
                onProcessRowUpdateError={err => console.log(err)}
                componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    pagination: {
                        pageSize: 10
                    },
                    // filter: {
                    //     filterModel: {
                    //         items: [{ columnField: 'perdidasODisponible', operadorValue: '>', value: 0.01 }]
                    //     }
                    // }
                }}
                loading={ordenesTrabajo == null}
                error={errorLoadingOrdenesTrabajo === true ? true : undefined}
                components={{
                    Toolbar: CustomToolbar
                }}
            />

        </Box>
    )
}

