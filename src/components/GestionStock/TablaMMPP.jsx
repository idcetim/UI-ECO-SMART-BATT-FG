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
import { mmppEndpoints } from '../../api/endpoints'
import { Box } from '@mui/system';
import { getObjIdToCalidad, getObjIdToOrigen, getObjIdToTamaño, getObjIdToUbicacion } from '../../helpers/api';
import '../../styles/stockTables.css'
import {
	Button,
	FormControl,
	Select,
	MenuItem,
	DialogTitle,
	Dialog,
	DialogActions,
	TextField
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { validarMateriasPrimas } from '../../helpers/validadores';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { BlobStorage } from '../../api/blobStorage'
import { registroEndpoints } from '../../api/endpoints'
import Tooltip from '@mui/material/Tooltip';
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
	if (isValidUrl(props.row.urlAnalisis)) {
		return (
			<strong>
				<Button
					component="button"
					className="button-table"
					size="small"
					sx={{
						textTransform: "none",
						color: "rgba(0,0,0,0.87)",
						fontSize: "12px",
						fontFamily: "roboto",
						fontWeight: 400
					}}
					onClick={() => window.open(props.row.urlAnalisis)}
				>📁 Descargar</Button>
			</strong>
		)
	}

	return <span style={{ marginLeft: "5px" }}>- -  -  -  - - - - </span>
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
	if (isValidUrl(props.row.urlGranulometria)) {
		return (
			<strong>
				<Button
					component="button"
					size="small"
					className="button-table"
					sx={{
						textTransform: "none",
						color: "rgba(0,0,0,0.87)",
						fontSize: "12px",
						fontFamily: "roboto",
						fontWeight: 400
					}}
					onClick={() => window.open(props.row.urlGranulometria)}
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
			<label for="file-input-granulometria">
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

export const TablaMMPP = ({ materiasPrimas, errorLoadingLotes, rol }) => {
	const [rows, setRows] = useState([]);
	const [rowModesModel, setRowModesModel] = useState({});
	const [tamaños, setTamaños] = useState({})
	const [calidades, setCalidades] = useState({})
	const [origenes, setOrigenes] = useState({})
	const [ubicaciones, setUbicaciones] = useState({})
	const [deleteState, setDeleteState] = useState({
		idToDelete: null,
		modalOpen: false
	})
	const [openAlertModal, setOpenAlertModal] = useState({
		status: false,
		text: ''
	})

	useEffect(() => {
		getObjIdToCalidad()
			.then(obj => setCalidades(obj))

		getObjIdToTamaño()
			.then(obj => setTamaños(obj))

		getObjIdToUbicacion()
			.then(obj => setUbicaciones(obj))

		getObjIdToOrigen()
			.then(obj => setOrigenes(obj))

	}, [])

	const getCodigoMMPP = (id) => {
		if (materiasPrimas) {
			for (let mmpp of materiasPrimas) {
				if (mmpp.id == id) {
					return mmpp.codigo
				}
			}
		}

		return null
	}

	useEffect(() => {
		if (materiasPrimas !== null) {
			setRows(materiasPrimas)
		}
	}, [materiasPrimas])

	const deleteMateriaPrima = async (id) => {
		setDeleteState({ ...deleteState, modalOpen: false })

		let promise = new Promise((resolve, reject) => {
			fetch(`${mmppEndpoints.deleteMMPP}?id=${id}`)
				.then(async (result) => {
					if (result.ok) {
						setRows(rows.filter((row) => row.id !== id));
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
			loading: 'Eliminando materia prima...',
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

		setDeleteState({ ...deleteState, modalOpen: false })
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

		let resultadoValidacion = validarMateriasPrimas(newRow)

		if (resultadoValidacion.errorValidacion) {
			alert(resultadoValidacion.mensajeError)

			return
		}

		let promise = new Promise((resolve, reject) => {
			fetch(mmppEndpoints.updateMMPP, {
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
			loading: 'Actualizando materia prima...',
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

	const RenderTamaño = (props) => {
		return (
			<div>{tamaños[props.row.tamañoId]}</div>
		)
	}

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
					<MenuItem value={null}></MenuItem>
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

	const RenderOrigen = (props) => {
		return (
			<div>{origenes[props.row.origenId]}</div>
		)
	}

	const RenderEditOrigen = props => {
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
					{origenes.ids.map(element => {
						return (
							<MenuItem key={element.id} value={element.id}>{origenes[element.id]}</MenuItem>
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
		{ field: 'codigo', headerName: 'Código', width: 120, editable: true },
		{ field: 'fecha', headerName: 'Fecha', width: 100, editable: true, renderCell: RenderFecha, renderEditCell: RenderEditFecha },
		{ field: 'tamañoId', headerName: 'Tamaño', width: 80, editable: true, renderCell: RenderTamaño, renderEditCell: RenderEditTamaño },
		{ field: 'calidadId', headerName: 'Calidad', width: 100, editable: true, renderCell: RenderCalidad, renderEditCell: RenderEditCalidad },
		{ field: 'origenId', headerName: 'Origen', width: 100, editable: true, renderCell: RenderOrigen, renderEditCell: RenderEditOrigen },
		{ field: 'ubicacionId', align: 'right', headerName: 'Ubicación', width: 100, editable: true, renderCell: RenderUbicacion, renderEditCell: RenderEditUbicacion },
		{
			field: 'cantidad', type: 'number', headerName: 'Cantidad (kg)', width: 120, editable: true, valueFormatter: (params) => {
				if (!isNaN(params.value)) {
					return parseFloat(params.value.toFixed(2)).toString()
				}

				return ''
			}
		},
		{
			field: 'disponibilidad', type: 'number', headerName: 'Disponible (kg)', width: 120, editable: false, valueFormatter: (params) => {
				if (!isNaN(params.value)) {
					return parseFloat(params.value.toFixed(2)).toString()
				}

				return ''
			}
		},
		{ field: 'urlAnalisis', headerName: 'Analisis', width: 100, editable: true, renderCell: RenderAnalisis, renderEditCell: RenderEditAnalisis },
		{ field: 'urlGranulometria', headerName: 'Granulometría', width: 110, editable: true, renderCell: RenderGranulometria, renderEditCell: RenderEditGranulometria },
		{ field: 'aluminio', type: 'number', headerName: 'Al', width: 75, editable: true },
		{ field: 'calcio', type: 'number', headerName: 'Ca', width: 75, editable: true },
		{ field: 'hierro', type: 'number', headerName: 'Fe', width: 75, editable: true },
		{ field: 'titanio', type: 'number', headerName: 'Ti', width: 75, editable: true },
		{ field: 'total', type: 'number', headerName: 'Total', width: 75, editable: true },
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
			<WarningModal setOpenAlertModal={setOpenAlertModal} openAlertModal={openAlertModal} />
			<Dialog
				open={deleteState.modalOpen}
				onClose={() => setDeleteState({ ...deleteState, modalOpen: false })}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle>Se va a efectuar el borrado de la materia prima {getCodigoMMPP(deleteState.idToDelete)}. ¿Quieres continuar?</DialogTitle>
				<DialogActions>
					<Button onClick={() => setDeleteState({ ...deleteState, modalOpen: false })}>Cancelar</Button>
					<Button onClick={() => deleteMateriaPrima(deleteState.idToDelete)} autoFocus>Aceptar</Button>
				</DialogActions>
			</Dialog>

			<Toaster />

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
					filter: {
						filterModel: {
							items: [{ columnField: 'disponibilidad', operatorValue: '>', value: 0.01 }]
						}
					}
				}}
				loading={materiasPrimas == null}
				error={errorLoadingLotes === true ? true : undefined}
				components={{
					Toolbar: CustomToolbar
				}}
			/>
		</Box>
	);
}