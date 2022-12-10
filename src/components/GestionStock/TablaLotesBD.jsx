import { useState, useEffect } from 'react'
import { GridRowModes, DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'
import { stockEndpoints } from '../../api/endpoints'
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';

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
  const { hasFocus, value } = props
  const buttonElement = useRef(null)
  const rippleRef = useRef(null)

  useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector('input')
      input?.focus()
    }

    else if (rippleRef.current) {
      rippleRef.current.stop({})
    }
  }, [hasFocus])

  if (isValidUrl(props.row.analisis)) {
    return (
      <strong>
        <Button
          component="button"
          ref={buttonElement}
          touchRippleRef={rippleRef}
          className="button-table"
          size="small"
          tabIndex={hasFocus ? 0 : -1}
          onClick={() => window.open(props.row.analisis)}
          onKeyDown={(event) => {
            if (event.key === ' ') {
              event.stopPropagation()
            }
          }}
        >📁 Descargar</Button>
      </strong>
    )
  }

  return <span style={{marginLeft: "5px"}}>- -  -  -  - - - - - -</span>
}

export const TablaLotesBD = ({ lotesBD, errorLoadingLotes }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

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

    fetch(stockEndpoints.update, {
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
    // { field: 'analisis', headerName: 'Análisis', width: 350, editable: true },
    {
      field: 'analisis', headerName: 'Analisis', width: 150, editable: false,
      renderCell: RenderAnalisis
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
        loading={lotesBD == null}
        error={errorLoadingLotes === true ? true : undefined}
        components={{
          Toolbar: CustomToolbar
        }}
      />
    </Box>
  );
}