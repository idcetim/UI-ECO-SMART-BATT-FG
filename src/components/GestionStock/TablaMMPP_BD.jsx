import { useState, useEffect } from 'react'
import { GridRowModes, DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'
import { mmppEndpoints } from '../../api/endpoints'
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { getObjIdToCalidad, getObjIdToTamaño } from '../../helpers/api';

import '../../styles/stockTables.css'

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
					onClick={() => window.open(props.row.analisis)}
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
					onClick={() => window.open(props.row.granulometria)}
				>📁 Descargar</Button>
			</strong>
		)
	}

	return <span style={{ marginLeft: "5px" }}>- -  -  -  - - - - - -</span>
}

export const TablaMMPP_BD = ({ lotesBD, errorLoadingLotes }) => {
	const [rows, setRows] = useState([]);
	const [rowModesModel, setRowModesModel] = useState({});
	const [tamaños, setTamaños] = useState({})
	const [calidades, setCalidades] = useState({})

	useEffect(() => {
		getObjIdToCalidad()
			.then(obj => setCalidades(obj))
		
		getObjIdToTamaño()
			.then(obj => setTamaños(obj))
	})

	useEffect(() => {
		if (lotesBD !== null) {
			setRows(lotesBD)
		}
	}, [lotesBD])

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
		fetch(`${mmppEndpoints.deleteMMPP}?id=${id}`)

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

	const processRowUpdate = async (newRow) => {
		const updatedRow = { ...newRow, isNew: false };

		fetch(mmppEndpoints.updateMMPP, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newRow)
		})

		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
	};

	const RenderTamaño = (props) => {
		return (
			<div>{tamaños[props.row.tamañoId]}</div>
		)
	}
	
	const RenderCalidad = (props) => {
		return (
			<div>{calidades[props.row.calidadId]}</div>
		)
	}

	const columns = [
		{ field: 'codigo', headerName: 'Código', width: 130, editable: true },
		{ field: 'fecha', headerName: 'Fecha', width: 120, editable: true },
		{ field: 'tamañoId', headerName: 'Tamaño', width: 80, editable: true, renderCell: RenderCalidad },
		{ field: 'calidadId', headerName: 'Calidad', width: 80, editable: true, renderCell: RenderTamaño },
		{ field: 'origen', headerName: 'Origen', width: 100, editable: true },
		{ field: 'ubicacion', headerName: 'Ubicación', width: 100, editable: true },
		{ field: 'cantidad', headerName: 'Cantidad', width: 100, type: 'string', editable: true },
		{ field: 'disponibilidad', headerName: 'Disponibilidad', width: 100, editable: true },
		{ field: 'analisis', headerName: 'Analisis', width: 110, editable: false, renderCell: RenderAnalisis },
		{ field: 'granulometria', headerName: 'Granulometría', width: 110, editable: true, renderCell: RenderGranulometria },
		{ field: 'aluninio', headerName: 'Al', width: 60, editable: true },
		{ field: 'calcio', headerName: 'Ca', width: 60, editable: true },
		{ field: 'hierro', headerName: 'Fe', width: 60, editable: true },
		{ field: 'titanio', headerName: 'Ti', width: 60, editable: true },
		{ field: 'total', headerName: 'Total', width: 60, editable: true },
		{ field: 'gra10', headerName: 'gra10', width: 60, editable: true },
		{ field: 'gra50', headerName: 'gra50', width: 60, editable: true },
		{ field: 'gra90', headerName: 'gra90', width: 60, editable: true },
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
				loading={lotesBD == null}
				error={errorLoadingLotes === true ? true : undefined}
				components={{
					Toolbar: CustomToolbar
				}}
			/>
		</Box>
	);
}