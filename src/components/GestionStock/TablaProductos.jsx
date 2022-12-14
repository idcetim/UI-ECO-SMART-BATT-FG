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
import { productosEndpoints, ordenesTrabajoEndpoints } from '../../api/endpoints'
import { Box } from '@mui/system';
import { Button, FormControl, Select, MenuItem, DialogTitle, Dialog, DialogActions, TextField } from '@mui/material';
import { getObjIdToCalidad, getObjIdToTamaño, getObjIdToUbicacion } from '../../helpers/api';
import '../../styles/stockTables.css'
import toast, { Toaster } from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { validarProducto } from '../../helpers/validadores'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { BlobStorage } from '../../api/blobStorage'
import { registroEndpoints } from '../../api/endpoints'
import Tooltip from '@mui/material/Tooltip';
import {botonesEditarYEleminarDisabled} from '../../helpers/mensajes'

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

const guardarArchivo = async (file) => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await fetch(registroEndpoints.file, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'file-type': BlobStorage['mmpp-gra']
		},
		mode: 'cors',
		body: formData
	})

	if (!response.ok) {
		throw new Error("Error añadiendo archivo MMPP granulometria")
	}

	return (await response.json()).url
}

const RenderAnalisis = (props) => {
    if (isValidUrl(props.row.quimicoUrl)) {
        return (
            <strong>
                <Button
                    component="button"
                    className="button-table"
                    size="small"
                    onClick={() => window.open(props.row.quimicoUrl)}
                >📁 Descargar</Button>
            </strong>
        )
    }

    return <span style={{ marginLeft: "5px" }}>- -  -  -  - - - - - -</span>
}

const RenderEditAnalisis = props => {
    const { id, value, field } = props
	const apiRef = useGridApiContext()

	if (isValidUrl(value)) {
		return (
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Tooltip title="Eliminar archivo de análisis">
					<DeleteForeverIcon
						sx={{ cursor: 'pointer' }}
						onClick={ev => {
							apiRef.current.setEditCellValue({ id, field, value: "" })
						}}
					/>
				</Tooltip>
			</div>
		)
	}

	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<label htmlFor="file-input-analisis">
				<Tooltip title="Añadir archivo de análisis">
					<CloudUploadIcon />
				</Tooltip>
			</label>

			<input
				id="file-input-analisis"
				type="file"
				style={{ display: 'none' }}
				onChange={async (ev) => {
					if (ev.target.files.length > 0) {
						let promise = guardarArchivo(ev.target.files[0])

						toast.promise(promise, {
							loading: 'Guardando archivo analisis...',
							success: 'Registro finalizado',
							error: 'Error en el registro'
						}, {
							style: {
								minWidth: '250px'
							},
							success: {
								duration: 4000,
								icon: '✅'
							}
						})

						let url = await promise

						apiRef.current.setEditCellValue({ id, field, value: url })
					}
				}}
			/>
		</div>
	)
}

const RenderGranulometria = props => {
    if (isValidUrl(props.row.granulometriaUrl)) {
        return (
            <strong>
                <Button
                    component="button"
                    className="button-table"
                    size="small"
                    onClick={() => window.open(props.row.granulometriaUrl)}
                >📁 Descargar</Button>
            </strong>
        )
    }

    return <span style={{ marginLeft: "5px" }}>- -  -  -  - - - - - -</span>
}

const RenderEditGranulometria = props => {
	const { id, value, field } = props
	const apiRef = useGridApiContext()

	if (isValidUrl(value)) {
		return (
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Tooltip title="Eliminar archivo granulometria">
					<DeleteForeverIcon
						sx={{ cursor: 'pointer' }}
						onClick={ev => {
							apiRef.current.setEditCellValue({ id, field, value: "" })
						}}
					/>
				</Tooltip>
			</div>
		)
	}

	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<label htmlFor="file-input-granulometria">
				<Tooltip title="Añadir archivo granulometria">
					<CloudUploadIcon />
				</Tooltip>
			</label>

			<input
				id="file-input-granulometria"
				type="file"
				style={{ display: 'none' }}
				onChange={async (ev) => {
					if (ev.target.files.length > 0) {
						let promise = guardarArchivo(ev.target.files[0])

						toast.promise(promise, {
							loading: 'Guardando archivo granulometria...',
							success: 'Registro finalizado',
							error: 'Error en el registro'
						}, {
							style: {
								minWidth: '250px'
							},
							success: {
								duration: 4000,
								icon: '✅'
							}
						})

						let url = await promise

						apiRef.current.setEditCellValue({ id, field, value: url })
					}
				}}
			/>
		</div>
	)
}

export const TablaProductos = ({ productos, errorLoadingProductos, rol }) => {
    const [rows, setRows] = useState([])
    const [rowModesModel, setRowModesModel] = useState({});
    const [tamaños, setTamaños] = useState({})
    const [calidades, setCalidades] = useState({})
    const [ubicaciones, setUbicaciones] = useState({})
    const [ordenesTrabajo, setOrdenesTrabajo] = useState([])
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

        fetch(ordenesTrabajoEndpoints.getOrdenesTrabajo)
            .then(response => response.json())
            .then(json => setOrdenesTrabajo(json))
    }, [])

    useEffect(() => {
        if (productos !== null) {
            setRows(productos)
        }
    }, [productos])

    const getOrdenesTrabajoMapping = () => {
        let mapping = {}

        for (let orden of ordenesTrabajo) {
            mapping[orden.id] = orden
        }

        return mapping
    }
    
    const getCodigoProducto = id => {
        if (productos) {
            for (let producto of productos) {
                if (id === producto.id) {
                    return producto.codigoProducto
                }
            }
        }

        return null
    }

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
        if (rol !== 2) {
            return
        }

        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
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

        let resultadoValidacion = validarProducto(newRow)

        if (resultadoValidacion.errorValidacion) {
            alert(resultadoValidacion.mensajeError)

            return
        }

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

    const RenderOrdenTrabajo = (props) => {
        if (getOrdenesTrabajoMapping()[props.row.ordenTrabajoId]) {
            return <div>{getOrdenesTrabajoMapping()[props.row.ordenTrabajoId].codigo}</div>
        }
        return null
    } 

    const RenderEditOrdenTrabajo = (props) => {
        const { id, value, field } = props
        const apiRef = useGridApiContext()

        const handleValueChange = (event) => {
            const newValue = event.target.value
            apiRef.current.setEditCellValue({ id, field, value: newValue })
        }

        return (
            <FormControl fullWidth>
                <Select
                    value={value}
                    onChange={handleValueChange}
                    sx={{ boxShadow: 'none', "& fieldset": { border: 'none' }, }}
                >
                    {ordenesTrabajo.map((ordenTrabajo) => {
                        return (
                            <MenuItem   
                            key={ordenTrabajo.id}
                            value={ordenTrabajo.id}
                        >
                            {ordenTrabajo.codigo}
                        </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }

    const columns = [
        { field: 'codigoProducto', headerName: 'Código', width: 130, editable: true },
        { field: 'ordenTrabajoId', headerName: 'Orden trabajo', width: 200, editable: true, renderCell: RenderOrdenTrabajo, renderEditCell: RenderEditOrdenTrabajo },
        { field: 'fecha', headerName: 'Fecha', width: 105, editable: true, renderCell: RenderFecha, renderEditCell: RenderEditFecha },
        { field: 'cantidad', type: 'number', headerName: 'Cantidad (kg)', width: 105, editable: true },
        { field: 'disponibilidad', headerName: 'Disponible (kg)', width: 110, editable: true },
        { field: 'calidadId', headerName: 'Calidad', width: 80, editable: true, renderCell: RenderCalidad, renderEditCell: RenderEditCalidad },
        { field: 'tamañoId', headerName: 'Tamaño', width: 80, editable: true, renderCell: RenderTamaño, renderEditCell: RenderEditTamaño },
        { field: 'ubicacionId', headerName: 'Ubicación', width: 100, editable: true, renderCell: RenderUbicacion, renderEditCell: RenderEditUbicacion },
        { field: 'quimicoUrl', headerName: 'Analisis', width: 110, editable: true, renderCell: RenderAnalisis, renderEditCell: RenderEditAnalisis },
        { field: 'granulometriaUrl', headerName: 'Granulometría', width: 110, editable: true, renderCell: RenderGranulometria, renderEditCell: RenderEditGranulometria },
        { field: 'aluminio', type: 'number', headerName: 'Al', width: 75, editable: true },
        { field: 'calcio', type: 'number', headerName: 'Ca', width: 75, editable: true },
        { field: 'hierro', type: 'number', headerName: 'Fe', width: 75, editable: true },
        { field: 'titanio', type: 'number', headerName: 'Ti', width: 75, editable: true },
        { field: 'totalImpurezas', type: 'number', headerName: 'Total', width: 75, editable: true },
        { field: 'gra10', type: 'number', headerName: 'gra10', width: 75, editable: true },
        { field: 'gra50', type: 'number', headerName: 'gra50', width: 75, editable: true },
        { field: 'gra90', type: 'number', headerName: 'gra90', width: 75, editable: true },
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
                <DialogTitle>Se va a efectuar el borrado del producto {getCodigoProducto(deleteState.idToDelete)}. ¿Quieres continuar?</DialogTitle>
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

