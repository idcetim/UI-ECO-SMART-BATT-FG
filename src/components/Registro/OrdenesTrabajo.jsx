import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react"
import {
    TextField,
    Grid,
    Box,
    Select,
    Button,
    MenuItem,
    Typography,
    FormControl,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    useTheme,
    Chip,
    InputLabel
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getCodigosMMPP, registroEndpoints } from '../../api/endpoints';
import { useEffect } from 'react';

const procesosOptions = ["Tamizado", "Molienda", "Primaria", "Horno y rotado", "JetMill"]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// function getStyles(name, materiasPrimas, theme) {
//     return {
//         fontWeight:
//             materiasPrimas.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

const guardarHandler = async (orden) => {
    try {
        const response = await fetch(registroEndpoints.orden, {
            method: 'POST',
            body: JSON.stringify(orden)
        })

        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
}

export const OrdenesTrabajo = () => {
    const [inputs, setInputs] = useState({
        codigoOT: "",
        fecha: null,
        proceso: procesosOptions[0],
        peso: "",
        materiasPrimas: []
    })
    const [codigosMMPP, setCodigosMMPP] = useState([])
    const theme = useTheme()

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setInputs({
            ...inputs,
            // On autofill we get a stringified value.
            materiasPrimas: typeof value === 'string' ? value.split(',') : value,
        });
    };

    useEffect(() => {
        const callback = async() => {
            const response = await fetch(getCodigosMMPP)

            setCodigosMMPP(await response.json())
        }

        callback()
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '700px', padding: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={1}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h5">Nueva orden de trabajo</Typography>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <TextField size="small" label="Código orden trabajo" variant='outlined' value={inputs.codigoOT} onChange={ev => setInputs({ ...inputs, codigoOT: ev.target.value })} />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha"
                                value={inputs.fecha}
                                onChange={(newDate) => {
                                    setInputs({ ...inputs, fecha: newDate })
                                }}
                                renderInput={(params) => <TextField size="small"{...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <Select
                            size="small"
                            value={inputs.proceso}
                            onChange={ev => {
                                setInputs({ ...inputs, proceso: ev.target.value })
                            }}
                            sx={{ width: '100%' }}
                        >
                            {procesosOptions.map(option => {
                                return <MenuItem value={option} key={option}>{option}</MenuItem>
                            })}
                        </Select>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <FormControl sx={{ width: '25ch' }} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                value={inputs.peso}
                                onChange={ev => {
                                    setInputs({ ...inputs, peso: ev.target.value })
                                }}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Peso</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">MMPP</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={inputs.materiasPrimas}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="MMPP" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={codigosMMPP[value - 1].codigo} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {codigosMMPP.map((codigo) => (
                                    <MenuItem
                                        key={codigo.id}
                                        value={codigo.id}
                                        // style={getStyles(name, inputs.materiasPrimas, theme)}
                                    >
                                        {codigo.codigo}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={8} md={12} sx={{display: 'flex', justifyContent: 'end'}}>
                        <Button variant='contained' size='medium' onClick={() => guardarHandler(inputs)}>Guardar</Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

