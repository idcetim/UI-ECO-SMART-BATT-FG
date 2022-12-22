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
    InputLabel,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { mmppEndpoints, ordenesTrabajoEndpoints, registroEndpoints, selectListEndpoints } from '../../api/endpoints';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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

//no se puede hacer try catch ya que si no el toaster no funciona
const guardarHandler = async (orden) => {
    console.log(orden)

    let response = await fetch(registroEndpoints.orden, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(orden),
    })

    if (!response.ok) {
        throw new Error(await response.text)
    }
}

export const OrdenesTrabajo = () => {
    const [inputs, setInputs] = useState({
        codigoOT: "",
        fecha: null,
        cantidadSalida: null,
        perdidas: null,
        tamañoId: 1,
        calidadId: 1,
        procesoId: 1,
        materiasPrimas: [],
        ordenesTrabajo: []
    })
    const [materiasPrimas, setMateriasPrimas] = useState([])
    const [ordenesTrabajo, setOrdenesTrabajo] = useState([])
    const [procesos, setProcesos] = useState([])
    const [calidades, setCalidades] = useState([])
    const [tamaños, setTamaños] = useState([])
    const [esPrimerProceso, setEsPrimerProceso] = useState(true)

    const theme = useTheme()

    const handleChangeMMPP = (event) => {
        const {
            target: { value },
        } = event;
        setInputs({
            ...inputs,
            // On autofill we get a stringified value.
            materiasPrimas: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleChangeOrdenesTrabajo = (event) => {
        const {
            target: { value }
        } = event

        setInputs({
            ...inputs,
            ordenesTrabajo: typeof value === 'string' ? value.split(',') : value
        })
    }

    useEffect(() => {
        fetch(mmppEndpoints.getMMPP)
            .then(response => response.json())
            .then(json => setMateriasPrimas(json))

        fetch(ordenesTrabajoEndpoints.getOrdenesTrabajo)
            .then(response => response.json())
            .then(json => setOrdenesTrabajo(json))

        fetch(selectListEndpoints.getProcesos)
            .then(response => response.json())
            .then(json => setProcesos(json))
        
        fetch(selectListEndpoints.getCalidades)
			.then(response => response.json())
			.then(json => setCalidades(json))

		fetch(selectListEndpoints.getSizes)
			.then(response => response.json())
			.then(json => setTamaños(json))

    }, [])
    const SelectMMPP = () => {
        return (
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">MMPP</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={inputs.materiasPrimas}
                    onChange={handleChangeMMPP}
                    input={<OutlinedInput id="select-multiple-chip" label="MMPP" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={materiasPrimas[value - 1].codigo} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {materiasPrimas.map((materiaPrima) => (
                        <MenuItem
                            key={materiaPrima.id}
                            value={materiaPrima.id}
                        // style={getStyles(name, inputs.materiasPrimas, theme)}
                        >
                            {materiaPrima.codigo}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    const SelectOrdenTrabajo = () => {
        return (
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Ordenes trabajo</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={inputs.ordenesTrabajo}
                    onChange={handleChangeOrdenesTrabajo}
                    input={<OutlinedInput id="select-multiple-chip" label="MMPP" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={ordenesTrabajo[value - 1].codigoOT} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {ordenesTrabajo.map((ordenTrabajo) => (
                        <MenuItem
                            key={ordenTrabajo.id}
                            value={ordenTrabajo.id}
                        // style={getStyles(name, inputs.materiasPrimas, theme)}
                        >
                            {ordenTrabajo.codigoOT}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Toaster />

            <Box sx={{ width: '700px', padding: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={1}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h5">Nueva orden de trabajo</Typography>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <TextField size="small" label="Código orden trabajo" variant='outlined' value={inputs.codigoOT} onChange={ev => setInputs({ ...inputs, codigoOT: ev.target.value })} />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">¿Es el primer proceso?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel checked={esPrimerProceso} onChange={() => setEsPrimerProceso(true)} control={<Radio />} label="Sí" />
                                <FormControlLabel checked={!esPrimerProceso} onChange={() => setEsPrimerProceso(false)} control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        {esPrimerProceso ? <SelectMMPP /> : <SelectOrdenTrabajo />}
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha"
                                value={inputs.fecha}
                                inputFormat="DD/MM/YY"
                                onChange={(newDate) => {
                                    setInputs({ ...inputs, fecha: `${newDate.$y}-${Number(newDate["$M"]) + 1}-${newDate["$D"]}` })
                                }}
                                renderInput={(params) => <TextField size="small"{...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    {/* <Grid item xs={2} sm={4} md={4}>
                        <FormControl sx={{ width: '25ch' }} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                type="number"
                                value={inputs.peso}
                                onChange={ev => {
                                    setInputs({ ...inputs, peso: ev.target.value == "" ? "" : ev.target.value })
                                }}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Peso</FormHelperText>
                        </FormControl>
                    </Grid> */}

                    <Grid item xs={2} sm={4} md={4}>
                        <TextField type="number" size="small" label="Cantidad" variant='outlined' value={inputs.cantidadSalida} onChange={ev => setInputs({ ...inputs, cantidadSalida: ev.target.value })} />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <TextField type="number" size="small" label="Pérdidas" variant='outlined' value={inputs.perdidas} onChange={ev => setInputs({ ...inputs, perdidas: ev.target.value })} />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <Select size="small" value={inputs.procesoId} onChange={ev => {setInputs({ ...inputs, procesoId: ev.target.value })}} sx={{ width: '100%' }}>
                            {procesos.map(proceso => {
                                return <MenuItem value={proceso.id} key={proceso.id}>{proceso.nombre}</MenuItem>
                            })}
                        </Select>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
						<Select size="small" value={inputs.calidadId} onChange={ev => setInputs({ ...inputs, calidadId: Number(ev.target.value) })} sx={{ width: '100%' }}>
							{calidades.map(option => {
								return <MenuItem value={option.id} key={option.id}>{option.nombre}</MenuItem>
							})}
						</Select>
					</Grid>

                    <Grid item xs={2} sm={4} md={4}>
						<Select size="small" value={inputs.tamañoId} onChange={ev => setInputs({ ...inputs, tamañoId: Number(ev.target.value) })} sx={{ width: '100%' }}>
							{tamaños.map(option => {
								return <MenuItem value={option.id} key={option.id}>{option.nombre}</MenuItem>
							})}
						</Select>
					</Grid>

                    <Grid item xs={4} sm={8} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
						<Button variant='contained' size='medium' onClick={() => {
							const promise = guardarHandler(inputs)

							toast.promise(promise, {
								loading: 'Registrando orden',
								success: 'Registro finalizado',
								error: 'Error en el registro'
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
						}}>Guardar</Button>
					</Grid>
                </Grid>
            </Box>
        </div>
    )
}

