import { useQuery } from 'react-query'
import { selectListEndpoints } from '../../api/endpoints'
import {
	GridRowModes,
	DataGrid,
	GridActionsCellItem,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import {
	Box,
	Button,
	DialogTitle,
	Dialog,
	DialogActions
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import PropTypes from 'prop-types';

const getUbicaciones = async () => {
	const response = await fetch(selectListEndpoints.getUbicaciones)

	if (response.ok) {
		return await response.json()
	}

	throw new Error()
}

function EditToolbar(props) {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const id = 3232
		setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}));
	};

	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
}

EditToolbar.propTypes = {
	setRowModesModel: PropTypes.func.isRequired,
	setRows: PropTypes.func.isRequired,
};

export const EditarUbicaciones = () => {
	const [rows, setRows] = useState([]);
	const [rowModesModel, setRowModesModel] = useState({});
	const [deleteState, setDeleteState] = useState({
		idToDelete: null,
		modalOpen: false
	})

	const { isLoading, isError } = useQuery('ubicaciones', getUbicaciones, {
		onSuccess: (data) => {
			setRows(data)
		}
	})

	const deleteUbicacion = async (id) => {
		setDeleteState({ ...deleteState, modalOpen: false })

		let promise = new Promise((resolve, reject) => {
			fetch(`${selectListEndpoints.deleteUbicacion}?id=${id}`)
				.then(async (result) => {
					if (result.ok) {
						setRows(rows.filter((row) => row.id !== id))
						resolve(result)
					}

					reject(result)
				})
				.catch(error => reject(error))
		})

		toast.promise(promise, {
			loading: 'Eliminando ubicacion...',
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
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id) => async () => {
		setDeleteState({idToDelete: id, modalOpen: true})
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
		const updatedRow = { ...newRow, isNew: false }

		let promise

		if (newRow.isNew) {
			promise = new Promise((resolve, reject) => {
				fetch(selectListEndpoints.addUbicacion, {
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
		}
		else {
			promise = new Promise((resolve, reject) => {
				fetch(selectListEndpoints.updateUbicacion, {
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
		}

		toast.promise(promise, {
			loading: `${newRow.isNew ? 'Guardando' : 'Actualizando'} ubicacion...`,
			success: 'Registro finalizado',
			error: 'Error en el registro',
		},
			{
				style: {
					minWidth: '250px'
				},
				success: {
					duration: 4000,
					icon: '✅'
				}
			}
		)

		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow
	}

	const columns = [
		{ field: 'nombre', headerName: 'Nombre', flex: 1, editable: true },
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
		}
	]

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
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
					<Dialog
						open={deleteState.modalOpen}
						onClose={() => setDeleteState({ ...deleteState, modalOpen: false })}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle>Se va a efectuar el borrado del registro de ubicacion con id {deleteState.idToDelete}. ¿Quieres continuar?</DialogTitle>
						<DialogActions>
							<Button onClick={() => setDeleteState({ ...deleteState, modalOpen: false })}>Cancelar</Button>
							<Button onClick={() => deleteUbicacion(deleteState.idToDelete)} autoFocus>Aceptar</Button>
						</DialogActions>
					</Dialog>

					<Toaster />

					<DataGrid
						rows={rows}
						columns={columns}
						editMode="row"
						rowModesModel={rowModesModel}
						onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
						onRowEditStart={handleRowEditStart}
						onRowEditStop={handleRowEditStop}
						processRowUpdate={processRowUpdate}
						components={{
							Toolbar: EditToolbar
						}}
						componentsProps={{
							toolbar: { setRows, setRowModesModel },
						}}
						experimentalFeatures={{ newEditingApi: true }}
						loading={isLoading}
					/>
				</Box>
			</div>
		</div>
	)
}

