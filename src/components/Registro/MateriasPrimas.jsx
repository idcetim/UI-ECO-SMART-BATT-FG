import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import { BlobStorage } from '../../api/blobStorage'
import { registroEndpoints, selectListEndpoints } from '../../api/endpoints'
import { TextField, Grid, Box, Select, Button, MenuItem, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../../styles/global.css'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const MateriasPrimas = () => {
	const [inputs, setInputs] = useState({
		codigo: '',
		fecha: null,
		tamañoId: 1,
		calidadId: 1,
		origen: '',
		ubicacion: '',
		cantidad: null,
		disponibilidad: null,
		urlAnalisis: "",
		urlGranulometria: "",
		aluminio: null,
		calcio: null,
		hierro: null,
		titanio: null,
		total: null,
		gra10: null,
		gra50: null,
		gra90: null
	})

	const [tamaños, setTamaños] = useState([])
	const [calidades, setCalidades] = useState([])
	const [granulometriaFile, setGranulometriaFile] = useState(undefined)
	const [analisisFile, setAnalisisFile] = useState(undefined)
	const granuRef = useRef()
	const analisisRef = useRef()

	useEffect(() => {
		fetch(selectListEndpoints.getCalidades)
			.then(response => response.json())
			.then(json => setCalidades(json))

		fetch(selectListEndpoints.getSizes)
			.then(response => response.json())
			.then(json => setTamaños(json))
	}, [])

	const guardarHandler = async () => {
		if (granulometriaFile) {
			const formData = new FormData();
			formData.append('file', granulometriaFile)
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
		}
		if (analisisFile) {
			const formData = new FormData();
			formData.append('file', analisisFile)
			const response = await fetch(registroEndpoints.file, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'file-type': BlobStorage['mmpp-qui']
				},
				mode: 'cors',
				body: formData
			})

			if (!response.ok) {
				throw new Error("Error añadiendo archivo MMPP quimico")
			}
		}

		let response = await fetch(registroEndpoints.mmpp, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(inputs),
		})

		if (!response.ok) {
			throw new Error(await response.text())
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

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Código lote" variant='outlined' value={inputs.codigo} onChange={ev => setInputs({ ...inputs, codigo: ev.target.value })} />
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
						<Select size="small" value={inputs.tamañoId} onChange={ev => setInputs({ ...inputs, tamañoId: Number(ev.target.value) })} sx={{ width: '100%' }}>
							{tamaños.map(option => {
								return <MenuItem value={option.id} key={option.id}>{option.nombre}</MenuItem>
							})}
						</Select>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField
							type="number"
							size="small"
							label="Cantidad (kg)"
							variant='outlined'
							value={inputs.cantidad}
							onChange={ev => {
								if (ev.target.value === "") {
									setInputs({
										...inputs,
										cantidad: "",
										disponibilidad: ""
									})

									return
								}

								setInputs({
									...inputs,
									cantidad: Number(ev.target.value),
									disponibilidad: Number(ev.target.value)
								})
							}} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Origen" variant='outlined' value={inputs.origen} onChange={ev => setInputs({ ...inputs, origen: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Ubicación" variant='outlined' value={inputs.ubicacion} onChange={ev => setInputs({ ...inputs, ubicacion: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<Select size="small" value={inputs.calidadId} onChange={ev => setInputs({ ...inputs, calidadId: Number(ev.target.value) })} sx={{ width: '100%' }}>
							{calidades.map(option => {
								return <MenuItem value={option.id} key={option.id}>{option.nombre}</MenuItem>
							})}
						</Select>
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Granulometría</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField type="number" size="small" label="Granulometría 10" variant='outlined' value={inputs.gra10} onChange={ev => setInputs({ ...inputs, gra10: ev.target.value === "" ? "" : Number(ev.target.value)})} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField type="number" size="small" label="Granulometría 50" variant='outlined' value={inputs.gra50} onChange={ev => setInputs({ ...inputs, gra50: ev.target.value === "" ? "" : Number(ev.target.value) })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField type="number" size="small" label="Granulometría 90" variant='outlined' value={inputs.gra90} onChange={ev => setInputs({ ...inputs, gra90: ev.target.value === "" ? "" : Number(ev.target.value) })} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{ maxWidth: "500px" }} ref={granuRef} onChange={() => {
							setInputs({
								...inputs,
								urlGranulometria: `https://silicio.blob.core.windows.net/${BlobStorage['mmpp-gra']}/${granuRef.current.files[0].name}`
							})
							setGranulometriaFile(granuRef.current.files[0])
						}} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Análisis</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Al" variant='outlined' value={inputs.aluminio} onChange={ev => setInputs({ ...inputs, aluminio: ev.target.value === "" ? "" : Number(ev.target.value) })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Ca" variant='outlined' value={inputs.calcio} onChange={ev => setInputs({ ...inputs, calcio: ev.target.value === "" ? "" : Number(ev.target.value) })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Fe" variant='outlined' value={inputs.hierro} onChange={ev => setInputs({ ...inputs, hierro: ev.target.value === "" ? "" : Number(ev.target.value) })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField type="number" size="small" label="Ti" variant="outlined" value={inputs.titanio} onChange={ev => setInputs({ ...inputs, titanio: ev.target.value === "" ? "" : Number(ev.target.value) })} />
					</Grid>

					<Grid item xs={2} sm={4} md={3}>
						<TextField type="number" size="small" label="Total" variant="outlined" value={inputs.totalImpurezas} onChange={ev => setInputs({ ...inputs, total: ev.target.value === "" ? "" : Number(ev.target.value) })} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{ maxWidth: "500px" }} ref={analisisRef} onChange={() => {
							setInputs({
								...inputs,
								urlAnalisis: `https://silicio.blob.core.windows.net/${BlobStorage['mmpp-qui']}/${analisisRef.current.files[0].name}`
							})
							setAnalisisFile(analisisRef.current.files[0])
						}
						} />
					</Grid>

					<Grid item xs={4} sm={8} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
						<Button variant='contained' size='medium' onClick={() => {
							const promise = guardarHandler()

							console.log(promise)

							toast.promise(promise, {
								loading: 'Registrando materia prima',
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
