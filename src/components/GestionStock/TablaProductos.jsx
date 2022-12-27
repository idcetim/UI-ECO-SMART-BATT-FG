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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'
import { productosEndpoints } from '../../api/endpoints'
import { Box } from '@mui/system';
import { Button, FormControl, Select, MenuItem, DialogTitle, Dialog, DialogActions, TextField } from '@mui/material';
import { getObjIdToCalidad, getObjIdToTamaño, getObjIdToUbicacion } from '../../helpers/api';
import '../../styles/stockTables.css'
import toast, { Toaster } from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

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

const RenderAnalisis = (props) => {
    if (isValidUrl(props.row.urlAnalisis)) {
        return (
            <strong>
                <Button
                    component="button"
                    className="button-table"
                    size="small"
                    onClick={() => window.open(props.row.urlAnalisis)}
                >📁 Descargar</Button>
            </strong>
        )
    }

    return <span style={{ marginLeft: "5px" }}>- -  -  -  - - - - - -</span>
}

const RenderGranulometria = props => {
    if (isValidUrl(props.row.urlGranulometria)) {
        return (
            <strong>
                <Button
                    component="button"
                    className="button-table"
                    size="small"
                    onClick={() => window.open(props.row.urlGranulometria)}
                >📁 Descargar</Button>
            </strong>
        )
    }

    return <span style={{ marginLeft: "5px" }}>- -  -  -  - - - - - -</span>
}

export const TablaProductos = ({ productos, errorLoadingProductos }) => {
    const [rows, setRows] = useState([])
    const [rowModesModel, setRowModesModel] = useState({});
    const [tamaños, setTamaños] = useState({})
    const [calidades, setCalidades] = useState({})
    const [ubicaciones, setUbicaciones] = useState({})
    const [deleteState, setDeleteState] = useState({
        idToDelete: null,
        modalOpen: false
    })

    useEffect(() => {
        getObjIdToCalidad()
            .then(obj => setCalidades(obj))

        getObjIdToTamaño()
            .then(obj => setTamaños(obj))

        getObjIdToUbicacion()
            .then(obj => setUbicaciones(obj))
    }, [])

    useEffect(() => {
        if (productos !== null) {
            setRows(productos)
        }
    }, [productos])

    const deleteProducto = (id) => {
        setDeleteState({ ...deleteState, modalOpen: false })

        let promise = new Promise((resolve, reject) => {
            fetch(`${productosEndpoints.deleteProducto}?id=${id}`)
                .then(result => {
                    if (result.ok) {
                        setRows(rows.filter((row) => row.id !== id));
                        resolve(result)
                    }

                    reject(result)
                })
                .catch(error => reject(error))
        })

        toast.promise(promise, {
            loading: 'Eliminando producto...',
            success: 'Registro eliminado',
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
    }

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

        let promise = new Promise((resolve, reject) => {
            fetch(productosEndpoints.updateProducto, {
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
            loading: 'Actualizando producto...',
            success: 'Producto actualizado',
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

    const RenderTamaño = (props) => (
        <div>{tamaños[props.row.tamañoId]}</div>
    )

    const RenderEditTamaño = props => {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();

        const handleValueChange = (event) => {
            const newValue = event.target.value; // The new value entered by the user
            apiRef.current.setEditCellValue({ id, field, value: newValue });
        };

        return (
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={handleValueChange}
                    sx={{ boxShadow: 'none', "& fieldset": { border: 'none' }, }}
                >
                    {tamaños.ids.map(element => {
                        return (
                            <MenuItem key={element.id} value={element.id}>{tamaños[element.id]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }

    const RenderCalidad = (props) => {
        return (
            <div>{calidades[props.row.calidadId]}</div>
        )
    }

    const RenderEditCalidad = props => {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();

        const handleValueChange = (event) => {
            const newValue = event.target.value; // The new value entered by the user
            apiRef.current.setEditCellValue({ id, field, value: newValue });
        };

        return (
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={handleValueChange}
                    sx={{ boxShadow: 'none', "& fieldset": { border: 'none' }, }}
                >
                    {calidades.ids.map(element => {
                        return (
                            <MenuItem key={element.id} value={element.id}>{calidades[element.id]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }

    const RenderUbicacion = (props) => {
        return (
            <div>{ubicaciones[props.row.ubicacionId]}</div>
        )
    }

    const RenderEditUbicacion = (props) => {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();

        const handleValueChange = (event) => {
            const newValue = event.target.value; // The new value entered by the user
            apiRef.current.setEditCellValue({ id, field, value: newValue });
        };

        return (
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={handleValueChange}
                    sx={{ boxShadow: 'none', "& fieldset": { border: 'none' }, }}
                >
                    {ubicaciones.ids.map(element => {
                        return (
                            <MenuItem key={element.id} value={element.id}>{ubicaciones[element.id]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }

    const columns = [
        { field: 'codigoProducto', headerName: 'Código', width: 130, editable: true },
        { field: 'fecha', headerName: 'Fecha', width: 105, editable: true, renderCell: RenderFecha, renderEditCell: RenderEditFecha },
        { field: 'cantidad', headerName: 'Cantidad (kg)', width: 105, type: 'string', editable: true },
        { field: 'disponibilidad', headerName: 'Disponible (kg)', width: 110, editable: true },
        { field: 'calidadId', headerName: 'Calidad', width: 80, editable: true, renderCell: RenderTamaño, renderEditCell: RenderEditTamaño },
        { field: 'tamañoId', headerName: 'Tamaño', width: 80, editable: true, renderCell: RenderCalidad, renderEditCell: RenderEditCalidad },
        { field: 'ubicacionId', headerName: 'Ubicación', width: 100, editable: true, renderCell: RenderUbicacion, renderEditCell: RenderEditUbicacion },
        { field: 'urlOrdenTrabajo', headerName: 'Orden trabajo', width: 100, editable: true },
        { field: 'urlQuimico', headerName: 'Analisis', width: 110, editable: false, renderCell: RenderAnalisis },
        { field: 'urlGranulometria', headerName: 'Granulometría', width: 110, editable: true, renderCell: RenderGranulometria },
        { field: 'aluminio', headerName: 'Al', width: 50, editable: true },
        { field: 'calcio', headerName: 'Ca', width: 50, editable: true },
        { field: 'hierro', headerName: 'Fe', width: 50, editable: true },
        { field: 'titanio', headerName: 'Ti', width: 50, editable: true },
        { field: 'totalImpurezas', headerName: 'Total', width: 50, editable: true },
        { field: 'gra10', headerName: 'gra10', width: 50, editable: true },
        { field: 'gra50', headerName: 'gra50', width: 50, editable: true },
        { field: 'gra90', headerName: 'gra90', width: 50, editable: true },
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
            <Toaster />

            <Dialog
                open={deleteState.modalOpen}
                onClose={() => setDeleteState({ ...deleteState, modalOpen: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Se va a efectuar el borrado del producto con id {deleteState.idToDelete}. ¿Quieres continuar?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteState({ ...deleteState, modalOpen: false })}>Cancelar</Button>
                    <Button onClick={() => {

                        deleteProducto(deleteState.idToDelete)

                        // setDeleteState({ ...deleteState, modalOpen: false })
                    }} autoFocus>
                        Aceptar
                    </Button>
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
                    }
                }}
                loading={productos == null}
                error={errorLoadingProductos === true ? true : undefined}
                components={{
                    Toolbar: CustomToolbar
                }}
            />

        </Box>
    )
}

