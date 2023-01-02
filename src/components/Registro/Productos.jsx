import { useState, useRef, useEffect } from 'react'
import { BlobStorage } from '../../api/blobStorage'
import { registroEndpoints } from '../../api/endpoints'
import { TextField, Box, Grid, Button, Select, MenuItem, Typography, OutlinedInput, Chip, InputLabel, FormControl } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Form from 'react-bootstrap/Form'
import { selectListEndpoints, ordenesTrabajoEndpoints } from '../../api/endpoints'
import '../../styles/global.css'
import toast, { Toaster } from 'react-hot-toast';
import { validarProducto } from '../../helpers/validadores'

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

export const Productos = () => {
	//se pone tamañoId 1 para que seleccione el primer elemento del combo
	const [inputs, setInputs] = useState({
		codigoProducto: '',
		// ordenesTrabajo: [],
		ordenTrabajoId: 1,
		fecha: null,
		cantidad: null,
		tamañoId: 1,
		ubicacionId: 1,
		calidadId: 1,
		gra10: null,
		gra50: null,
		gra90: null,
		granulometriaUrl: '',
		aluminio: null,
		calcio: null,
		hierro: null,
		titanio: null,
		totalImpurezas: null,
		quimicoUrl: ''
	})

	const [granulometriaFile, setGranulometriaFile] = useState(undefined)
	const [quimicoFile, setQuimicoFile] = useState(undefined)
	const [tamaños, setTamaños] = useState([])
	const [calidades, setCalidades] = useState([])
	const [ordenesTrabajo, setOrdenesTrabajo] = useState([])
	const [ubicaciones, setUbicaciones] = useState([])
	const granuRef = useRef()
	const quimicoRef = useRef()

	useEffect(() => {
		fetch(selectListEndpoints.getSizes)
			.then(response => response.json())
			.then(json => setTamaños(json))

		fetch(selectListEndpoints.getCalidades)
			.then(response => response.json())
			.then(json => setCalidades(json))

		fetch(ordenesTrabajoEndpoints.getOrdenesTrabajo)
			.then(response => response.json())
			.then(json => setOrdenesTrabajo(json))

		fetch(selectListEndpoints.getUbicaciones)
			.then(response => response.json())
			.then(json => setUbicaciones(json))
	}, [])

	const getOrdenesTrabajoMapping = () => {
		let mapping = {}

		for (let orden of ordenesTrabajo) {
			mapping[orden.id] = orden
		}

		return mapping
	}

	const handleCodigoOTChange = (event) => {
		const { target: { value } } = event

		setInputs({
			...inputs,
			ordenesTrabajo: typeof value === 'string' ? value.split(',') : value
		})
	}

	const guardarHandler = async () => {
		let resultadoValidacion = validarProducto(inputs)

		if (resultadoValidacion.errorValidacion) {
			alert(resultadoValidacion.mensajeError)

			throw new Error()
		}

		if (granulometriaFile) {
			try {
				const formData = new FormData();
				formData.append('file', granulometriaFile)
				const response = await fetch(registroEndpoints.file, {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'file-type': BlobStorage['pro-gra']
					},
					mode: 'cors',
					body: formData
				})

				if (!response.ok) {
					throw new Error("Error guardando archivo granulometria")
				}
			} catch (error) {
				console.log("Error añadiendo archivo Producto granulometria: ", error)
				throw error
			}
		}
		if (quimicoFile) {
			try {
				const formData = new FormData();
				formData.append('file', quimicoFile)
				const response = await fetch(registroEndpoints.file, {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'file-type': BlobStorage['pro-qui']
					},
					mode: 'cors',
					body: formData
				})

				if (!response.ok) {
					throw new Error("Error guardando archivo quimico")
				}

			} catch (error) {
				console.log("Error añadiendo archivo Producto quimico: ", error)
				throw error
			}
		}

		try {
			const response = await fetch(registroEndpoints.producto, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(inputs),
			})

			if (!response.ok) {
				throw new Error("Error guardando datos")
			}
		} catch (error) {
			console.log("Error añadiendo información de Producto: ", error)
			throw error
		}
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Toaster />

			<Box sx={{ width: '700px', padding: '20px' }}>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Información general</Typography>
					</Grid>

					{/* <Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Código orden de trabajo" variant='outlined' value={inputs.codigoOrdenTrabajo} onChange={ev => setInputs({ ...inputs, codigoOrdenTrabajo: ev.target.value })} />
					</Grid> */}

					<Grid item xs={2} sm={4} md={4}>
						<FormControl sx={{ width: '100%' }}>
							{/* <InputLabel id="demo-multiple-chip-label">Ordenes trabajo</InputLabel> */}
							{/* <Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								value={inputs.ordenesTrabajo}
								onChange={handleCodigoOTChange}
								input={<OutlinedInput id="select-multiple-chip" label="Órdenes de trabajo" />}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={getOrdenesTrabajoMapping()[value].codigo} />
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
										{ordenTrabajo.codigo}
									</MenuItem>
								))}
							</Select> */}

							<InputLabel>Orden trabajo</InputLabel>
							<Select
								label="Orden trabajo"
								value={inputs.OrdenTrabajoId}
								onChange={ev => setInputs({...inputs, ordenTrabajoId: ev.target.value})}
							>
								{ordenesTrabajo.map((ordenTrabajo) => (
									<MenuItem
										key={ordenTrabajo.id}
										value={ordenTrabajo.id}
									>
										{ordenTrabajo.codigo}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Código nuevo producto" variant='outlined' value={inputs.codigoProducto} onChange={ev => setInputs({ ...inputs, codigoProducto: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label="Fecha"
								value={inputs.fecha}
								inputFormat="DD/MM/YY"
								onChange={(newDate) => {
									setInputs({ ...inputs, fecha: `${newDate.$y}-${Number(newDate["$M"]) + 1}-${newDate["$D"]}` });
								}}
								renderInput={(params) => <TextField size="small" {...params} />}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<FormControl fullWidth>
							<InputLabel>Tamaño</InputLabel>
							<Select label="Tamaño" size="small" value={inputs.tamañoId} onChange={ev => setInputs({ ...inputs, tamañoId: ev.target.value })} sx={{ width: '100%' }}>
								{tamaños.map(option => {
									return <MenuItem value={option.id} key={option.id}>{option.nombre}</MenuItem>
								})}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField 
							size="small" 
							type="number"
							label="Cantidad (kg)" 
							variant='outlined' 
							value={inputs.cantidad} 
							onChange={ev => setInputs({ ...inputs, cantidad: ev.target.value })} 
						/>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<FormControl fullWidth>
							<InputLabel>Calidad</InputLabel>

							<Select label="Calidad" size="small" value={inputs.calidadId} onChange={ev => setInputs({ ...inputs, calidadId: ev.target.value })} sx={{ width: '100%' }}>
								{calidades.map(option => {
									return <MenuItem value={option.id} key={option.id}>{option.nombre}</MenuItem>
								})}
							</ Select>
						</FormControl>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Ubicacion</InputLabel>

							<Select size="small" label='Ubicacion' value={inputs.ubicacionId} onChange={ev => setInputs({ ...inputs, ubicacionId: ev.target.value })} sx={{ width: '100%' }}>
								{ubicaciones.map(option => {
									return <MenuItem value={option.id} key={option.id}>{option.nombre}</MenuItem>
								})}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Granulometría</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField type="number" size="small" label="Granulometría 10" variant='outlined' value={inputs.gra10} onChange={ev => setInputs({ ...inputs, gra10: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField type="number" size="small" label="Granulometría 50" variant='outlined' value={inputs.gra50} onChange={ev => setInputs({ ...inputs, gra50: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField type="number" size="small" label="Granulometría 90" variant='outlined' value={inputs.gra90} onChange={ev => setInputs({ ...inputs, gra90: ev.target.value })} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{ maxWidth: "500px" }} ref={granuRef} onChange={ev => {
							setInputs({
								...inputs,
								granulometriaUrl: `https://silicio.blob.core.windows.net/${BlobStorage['pro-gra']}/${granuRef.current.files[0].name}`
							})
							setGranulometriaFile(granuRef.current.files[0])
						}} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Análisis químico</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Al" variant='outlined' value={inputs.aluminio} onChange={ev => setInputs({ ...inputs, aluminio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Ca" variant='outlined' value={inputs.calcio} onChange={ev => setInputs({ ...inputs, calcio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Fe" variant='outlined' value={inputs.hierro} onChange={ev => setInputs({ ...inputs, hierro: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Ti" variant="outlined" value={inputs.titanio} onChange={ev => setInputs({ ...inputs, titanio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={3}>
						<TextField type="number" size="small" label="Total" variant="outlined" value={inputs.totalImpurezas} onChange={ev => setInputs({ ...inputs, totalImpurezas: ev.target.value })} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{ maxWidth: "500px" }} ref={quimicoRef} onChange={ev => {
							setInputs({
								...inputs,
								quimicoUrl: `https://silicio.blob.core.windows.net/${BlobStorage['pro-qui']}/${quimicoRef.current.files[0].name}`
							})
							setQuimicoFile(quimicoRef.current.files[0])
						}} />
					</Grid>

					<Grid item xs={4} sm={8} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
						<Button variant='contained' size='medium' onClick={() => {
							const promise = guardarHandler(inputs)

							toast.promise(promise, {
								loading: 'Registrando producto',
								success: 'Registro finalizado',
								error: 'Error en el registro'
							},
								{
									style: {
										minWidth: '250px',
									},
									success: {
										duration: 4000,
										icon: '✅'
									}
								})
						}} >Guardar</Button>
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}

