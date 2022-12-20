import { useState, useEffect } from 'react'
import { GridRowModes, DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'
import { mmppEndpoints } from '../../api/endpoints'
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { getObjIdToCalidad, getObjIdToProceso, getObjIdToTamaño } from '../../helpers/api';
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

export const TablaOrdenesTrabajo = ({ ordenesTrabajo, errorLoadingOrdenesTrabajo }) => {
    const [rows, setRows] = useState([])
    const [rowModesModel, setRowModesModel] = useState({});
    const [tamaños, setTamaños] = useState({})
    const [calidades, setCalidades] = useState({})
    const [procesos, setProcesos] = useState({})

    useEffect(() => {
        getObjIdToCalidad()
            .then(obj => setCalidades(obj))

        getObjIdToTamaño()
            .then(obj => setTamaños(obj))

        getObjIdToProceso()
            .then(obj => setProcesos(obj))
    })

    useEffect(() => {
        if (ordenesTrabajo !== null) {
            setRows(ordenesTrabajo)
        }
    })

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
        // fetch(`${mmppEndpoints.deleteMMPP}?id=${id}`)

        // setRows(rows.filter((row) => row.id !== id));
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

        // fetch(mmppEndpoints.updateMMPP, {
        // 	method: 'POST',
        // 	headers: {
        // 		'Content-Type': 'application/json'
        // 	},
        // 	body: JSON.stringify(newRow)
        // })

        // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
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

    const RenderProceso = (props) => {
        return (
            <div>{procesos[props.row.procesoId]}</div>
        )
    }

    const columns = [
        { field: 'codigoOT', headerName: 'Código', width: 130, editable: true },
        { field: 'fecha', headerName: 'Fecha', width: 130, editable: true },
        { field: 'cantidadSalida', headerName: 'Cantidad salida', width: 130, editable: true },
        { field: 'disponible', headerName: 'Disponible', width: 130, editable: true },
        { field: 'perdidas', headerName: 'Pérdidas', width: 130, editable: true },
        { field: 'tamañoId', headerName: 'Tamaño', width: 130, editable: true, renderCell: RenderTamaño },
        { field: 'calidadId', headerName: 'Calidad', width: 130, editable: true, renderCell: RenderCalidad },
        { field: 'procesoId', headerName: 'Proceso', width: 130, editable: true, renderCell: RenderProceso },
        { field: 'ordenAnteriorId', headerName: 'Orden anterior', width: 130, editable: true },
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
                loading={ordenesTrabajo == null}
                error={errorLoadingOrdenesTrabajo === true ? true : undefined}
                components={{
                    Toolbar: CustomToolbar
                }}
            />

        </Box>
    )
}

