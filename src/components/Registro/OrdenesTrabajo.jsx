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
    Paper
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { mmppEndpoints, ordenesTrabajoEndpoints, registroEndpoints, selectListEndpoints } from '../../api/endpoints';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Add } from '@mui/icons-material'

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
        codigo: "",
        fecha: null,
        procesosIds: [1],
        materiasPrimas: [{
            id: 1,
            cantidadEntrada: null
        }],
        numeroMateriasPrimas: 1
    })
    const [materiasPrimas, setMateriasPrimas] = useState([])
    const [procesos, setProcesos] = useState([])

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

        fetch(selectListEndpoints.getProcesos)
            .then(response => response.json())
            .then(json => setProcesos(json))
    }, [])

    const CuadrosTextoMMPP = () => {
        let text = []

        for (let i = 1; i <= inputs.numeroMateriasPrimas; i++) {
            text.push(
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
                                    return (
                                        <MenuItem
                                            key={materiaPrima.id}
                                            value={materiaPrima.id}
                                        >
                                            {materiaPrima.codigo}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
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
                    </Grid>
                </>
            )

            if (i == inputs.numeroMateriasPrimas) {
                text.push(
                    <Grid item xs={12} alignContent="center" alignItems="center">
                        <Add fontSize='large' onClick={() => {
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
                    </Grid>
                )
            }
        }

        return (
            <Grid container spacing={2}>
                {text}
            </Grid>
        )
    }

    const SelectMMPP = () => {
        return (
            <FormControl sx={{ width: 300 }}>
                {/* <InputLabel id="demo-multiple-chip-label">MMPP</InputLabel>
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
                        style={getStyles(name, inputs.materiasPrimas, theme)}
                        >
                            {materiaPrima.codigo}
                        </MenuItem>
                    ))}
                </Select> */}

                <CuadrosTextoMMPP />
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
                        <TextField size="small" label="Código orden trabajo" variant='outlined' value={inputs.codigo} onChange={ev => setInputs({ ...inputs, codigo: ev.target.value })} />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <Typography variant="h6">Materias primas:</Typography>
                        <Paper variant="outlined" sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <SelectMMPP />
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
                                sx={{
                                    width: '600px',
                                    maxWidth: '90%'
                                }}>
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

