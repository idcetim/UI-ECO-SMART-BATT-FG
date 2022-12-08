import { useState, useRef } from 'react'
import { BlobStorage } from '../../api/blobStorage'
import { registroEndpoints } from '../../api/endpoints'
import { TextField, Box, Grid, Button, Select, MenuItem, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Form from 'react-bootstrap/Form'

import '../../styles/global.css'

const selectQualityOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
const selectTamOptions = ["Tamaño", "0.2 - 2 mm", "< 0.5 mm"]

export const Productos = () => {
	const [inputs, setInputs] = useState({
		codigoProducto: '',
		codigoOrdenTrabajo: '',
		fecha: null,
		cantidad: '',
		tam: selectTamOptions[0],
		origen: '',
		ubicacion: '',
		calidad: selectQualityOptions[0],
		granulometria10: '',
		granulometria50: '',
		granulometria90: '',
		granulometriaUrl: '',
		aluminio: '',
		calcio: '',
		hierro: '',
		titanio: '',
		total: '',
		quimicoUrl: ''
	})

	const [granulometriaFile, setGranulometriaFile] = useState(undefined)
	const [quimicoFile, setQuimicoFile] = useState(undefined)
	const granuRef = useRef()
	const quimicoRef = useRef()

	const guardarHandler = async () => {
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
				console.log(await response.json())
			} catch (error) {
				console.log("Error añadiendo archivo Producto granulometria: ", error)
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
				console.log(await response.json())
			} catch (error) {
				console.log("Error añadiendo archivo Producto quimico: ", error)
			}
		}
		try {
			await fetch("http://localhost:7071/api/registrar-mmpp", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(inputs),
			})
		} catch (error) {
			console.log("Error añadiendo información de Producto: ", error)
		}
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Box sx={{ width: '700px', padding: '20px' }}>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Información general</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Código orden de trabajo" variant='outlined' value={inputs.codigoOrdenTrabajo} onChange={ev => setInputs({ ...inputs, codigoOrdenTrabajo: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Código nuevo producto" variant='outlined' value={inputs.codigoProducto} onChange={ev => setInputs({ ...inputs, codigoProducto: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label="Fecha"
								value={inputs.fecha}
								onChange={(newValue) => {
									setInputs({ ...inputs, fecha: newValue });
								}}
								renderInput={(params) => <TextField size="small" {...params} />}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<Select size="small" value={inputs.tam} onChange={ev => setInputs({ ...inputs, tam: ev.target.value })} sx={{ width: '100%' }}>
							{selectTamOptions.map(option => {
								return <MenuItem value={option} key={option}>{option}</MenuItem>
							})}
						</Select>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Cantidad (kg)" variant='outlined' value={inputs.cantidad} onChange={ev => setInputs({ ...inputs, cantidad: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<Select size="small" value={inputs.calidad} onChange={ev => setInputs({ ...inputs, calidad: ev.target.value })} sx={{ width: '100%' }}>
							{selectQualityOptions.map(option => {
								return <MenuItem value={option} key={option}>{option}</MenuItem>
							})}
						</ Select>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="Ubicación" variant="outlined" value={inputs.ubicacion} onChange={ev => setInputs({ ...inputs, ubicacion: ev.target.value })} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Granulometría</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="10" variant='outlined' value={inputs.granulometria10} onChange={ev => setInputs({ ...inputs, granulometria10: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="50" variant='outlined' value={inputs.granulometria50} onChange={ev => setInputs({ ...inputs, granulometria50: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small" label="90" variant='outlined' value={inputs.granulometria90} onChange={ev => setInputs({ ...inputs, granulometria90: ev.target.value })} />
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
						<TextField size="small" label="Aluminio" variant='outlined' value={inputs.aluminio} onChange={ev => setInputs({ ...inputs, aluminio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField size="small" label="Calcio" variant='outlined' value={inputs.calcio} onChange={ev => setInputs({ ...inputs, calcio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField size="small" label="Hierro" variant='outlined' value={inputs.hierro} onChange={ev => setInputs({ ...inputs, hierro: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField size="small" label="Titanio" variant="outlined" value={inputs.titanio} onChange={ev => setInputs({ ...inputs, titanio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={3}>
						<TextField size="small" label="Total impurezas" variant="outlined" value={inputs.totalImpurezas} onChange={ev => setInputs({ ...inputs, totalImpurezas: ev.target.value })} />
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
						<Button variant='contained' size='medium' onClick={guardarHandler} >Guardar</Button>
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}

