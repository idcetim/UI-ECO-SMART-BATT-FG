import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import { BlobStorage } from '../../api/blobStorage'
import { registroEndpoints } from '../../api/endpoints'
import { TextField, Grid, Box, Select, Button, MenuItem, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../../styles/global.css'

const selectOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]

export const MateriasPrimas = () => {
	const [inputs, setInputs] = useState({
		codigoLote: '',
		fecha: null,
		cantidad: '',
		tam: '',
		origen: '',
		ubicacion: '',
		calidad: selectOptions[0],
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
	const [analisisFile, setAnalisisFile] = useState(undefined)
	const granuRef = useRef()
	const analisisRef = useRef()

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
						'file-type': BlobStorage['mmpp-gra']
					},
					mode: 'cors',
					body: formData
				})
				console.log(await response.json())
			} catch (error) {
				console.log("Error añadiendo archivo MMPP granulometria: ", error)
			}
		}
		if (analisisFile) {
			try {
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
				console.log(await response.json())
			} catch (error) {
				console.log("Error añadiendo archivo MMPP quimico: ", error)
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
			console.log("Error añadiendo MMPP informacion: ", error)
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
						<TextField size="small"  label="Código lote" variant='outlined' value={inputs.codigoLote} onChange={ev => setInputs({ ...inputs, codigoLote: ev.target.value })} />
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
						<TextField size="small" label="Tamaño" variant='outlined' value={inputs.tam} onChange={ev => setInputs({ ...inputs, tam: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small"  label="Cantidad (kg)" variant='outlined' value={inputs.cantidad} onChange={ev => setInputs({ ...inputs, cantidad: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small"  label="Origen" variant='outlined' value={inputs.origen} onChange={ev => setInputs({ ...inputs, origen: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small"  label="Ubicación" variant='outlined' value={inputs.ubicacion} onChange={ev => setInputs({ ...inputs, ubicacion: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<Select size="small" value={inputs.calidad} onChange={ev => setInputs({ ...inputs, calidad: ev.target.value })} sx={{ width: '100%' }}>
							{selectOptions.map(option => {
								return <MenuItem value={option} key={option}>{option}</MenuItem>
							})}
						</Select>
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Granulometría</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small"  label="10" variant='outlined' value={inputs.granulometria10} onChange={ev => setInputs({ ...inputs, granulometria10: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small"  label="50" variant='outlined' value={inputs.granulometria50} onChange={ev => setInputs({ ...inputs, granulometria50: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField size="small"  label="90" variant='outlined' value={inputs.granulometria90} onChange={ev => setInputs({ ...inputs, granulometria90: ev.target.value })} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{ maxWidth: "500px" }} ref={granuRef} onChange={() => {
							setInputs({
								...inputs,
								granulometriaUrl: `https://silicio.blob.core.windows.net/${BlobStorage['mmpp-gra']}/${granuRef.current.files[0].name}`
							})
							setGranulometriaFile(granuRef.current.files[0])
						}} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Typography variant="h5">Análisis</Typography>
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField size="small" label="Aluminio" variant='outlined' value={inputs.aluminio} onChange={ev => setInputs({ ...inputs, aluminio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField size="small" label="Calcio" variant='outlined' value={inputs.calcio} onChange={ev => setInputs({ ...inputs, calcio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField size="small"  label="Hierro" variant='outlined' value={inputs.hierro} onChange={ev => setInputs({ ...inputs, hierro: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={2}>
						<TextField size="small" label="Titanio" variant="outlined" value={inputs.titanio} onChange={ev => setInputs({ ...inputs, titanio: ev.target.value })} />
					</Grid>

					<Grid item xs={2} sm={4} md={3}>
						<TextField size="small" label="Total impurezas" variant="outlined" value={inputs.totalImpurezas} onChange={ev => setInputs({ ...inputs, totalImpurezas: ev.target.value })} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{ maxWidth: "500px" }} ref={analisisRef} onChange={() => {
							setInputs({
								...inputs,
								quimicoUrl: `https://silicio.blob.core.windows.net/${BlobStorage['mmpp-qui']}/${analisisRef.current.files[0].name}`
							})
							setAnalisisFile(analisisRef.current.files[0])
						}
						} />
					</Grid>

					<Grid item xs={4} sm={8} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
						<Button variant='contained' size='medium' onClick={guardarHandler}>Guardar</Button>
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}
