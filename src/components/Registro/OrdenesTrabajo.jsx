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
    Radio,
    Item,
    Paper,
    Tooltip
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { mmppEndpoints, ordenesTrabajoEndpoints, registroEndpoints, selectListEndpoints } from '../../api/endpoints';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Add } from '@mui/icons-material'
import { validarOrdenTrabajo } from '../../helpers/validadores';

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

export const OrdenesTrabajo = () => {
    const [inputs, setInputs] = useState({
        codigo: "",
        fecha: null,
        procesosIds: [1],
        materiasPrimas: [{
            id: 1,
            cantidadEntrada: null
        }],
        numeroMateriasPrimas: 1,
        prueba: ""
    })
    const [materiasPrimas, setMateriasPrimas] = useState([])
    const [procesos, setProcesos] = useState([])

    // useEffect(() => {
    //     console.log(materiasPrimas.length)
    //     console.log(!inputs.materiasPrimas[0].id)
    //     consoel.log(inputs.materiasPrimas.length == 1)

    //     if (materiasPrimas.length > 0 && !inputs.materiasPrimas[0].id && inputs.materiasPrimas.length == 1) {
    //         setInputs({...inputs, materiasPrimas: [{id: materiasPrimas[0].id}]})
    //     }
    // }, [materiasPrimas])

    const theme = useTheme()

    const getMMPPMapping = () => {
        let mapping = {}

        for (let mmpp of materiasPrimas) {
            mapping[mmpp.id] = mmpp
        }

        return mapping
    }

    const guardarHandler = async (orden) => {
        let resultadoValidacion = validarOrdenTrabajo(orden)

        let objMateriasPrimas = getMMPPMapping()

        for (let mmpp of inputs.materiasPrimas) {
            if (mmpp.cantidadEntrada > objMateriasPrimas[mmpp.id].disponibilidad) {
                resultadoValidacion.mensajeError += "La materia prima seleccionada no tiene suficientes existencias disponibles para satisfacer la cantidad indicada \n"
                resultadoValidacion.errorValidacion = true

                break
            }
        }

        if (resultadoValidacion.errorValidacion) {
            alert(resultadoValidacion.mensajeError)

            throw new Error()
        }

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

        fetch(selectListEndpoints.getProcesos)
            .then(response => response.json())
            .then(json => setProcesos(json))
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Toaster />

            <Box sx={{ width: '700px', maxWidth: "90%", padding: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={1}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant="h5">Nueva orden de trabajo</Typography>
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <TextField size="small" label="Código orden trabajo" variant='outlined' value={inputs.codigo} onChange={ev => setInputs({ ...inputs, codigo: ev.target.value })} />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <Typography variant="h6">Materias primas:</Typography>
                        <Paper variant="outlined" sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* <SelectMMPP /> */}
                            <FormControl sx={{ width: "100%" }}>
                                <Grid container spacing={2}>
                                    {Array.from({ length: inputs.numeroMateriasPrimas }, (_, i) => i + 1).map(i => {
                                        return (
                                            <>
                                                <Grid item xs={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>MMPP</InputLabel>

                                                        <Select
                                                            label="MMPP"
                                                            value={inputs.materiasPrimas[i - 1].id}
                                                            onChange={ev => {
                                                                let mmpp = inputs.materiasPrimas
                                                                mmpp[i - 1].id = ev.target.value

                                                                setInputs({
                                                                    ...inputs,
                                                                    materiasPrimas: mmpp
                                                                })
                                                            }}
                                                            sx={{ width: '100%' }}
                                                        >
                                                            {materiasPrimas.map((materiaPrima) => {
                                                                if (materiaPrima.disponibilidad > 0.01) {
                                                                    return (
                                                                        <MenuItem
                                                                            key={materiaPrima.id}
                                                                            value={materiaPrima.id}
                                                                        >
                                                                            {materiaPrima.codigo}
                                                                        </MenuItem>
                                                                    )
                                                                }

                                                                return null
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            label="cantidad"
                                                            type="number"
                                                            value={inputs.materiasPrimas[i - 1].cantidadEntrada}
                                                            onChange={ev => {
                                                                let mmpp = inputs.materiasPrimas

                                                                mmpp[i - 1].cantidadEntrada = ev.target.value

                                                                setInputs({
                                                                    ...inputs,
                                                                    materiasPrimas: mmpp
                                                                })
                                                            }} />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )
                                    })}

                                    <Grid item xs={12}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Tooltip title="Añadir otra materia prima">
                                                <Add fontSize='large' sx={{ cursor: 'pointer' }} onClick={() => {
                                                    let mmpp = inputs.materiasPrimas
                                                    mmpp.push({
                                                        id: 1,
                                                        cantidadEntrada: null
                                                    })

                                                    setInputs({
                                                        ...inputs,
                                                        numeroMateriasPrimas: inputs.numeroMateriasPrimas + 1,
                                                        materiasPrimas: mmpp
                                                    })
                                                }} />
                                            </Tooltip>
                                        </div>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </Paper>
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

                    <Grid item xs={2} sm={4} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Procesos</InputLabel>
                            <Select
                                label="procesos"
                                size="small"
                                value={inputs.procesosIds}
                                multiple
                                onChange={ev => { setInputs({ ...inputs, procesosIds: ev.target.value }) }}
                                sx={{width: { xs: '300px', sm: '500px'} }}
                            >
                                {procesos.map(proceso => {
                                    return <MenuItem value={proceso.id} key={proceso.id}>{proceso.nombre}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
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

