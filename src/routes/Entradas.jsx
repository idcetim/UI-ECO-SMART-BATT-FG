import { useState } from 'react';
import '../styles/global.css'
import Form from 'react-bootstrap/Form'
import { TextField, Grid, Paper, Box, Select, Button, MenuItem } from '@mui/material';

const selectOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]

const Entradas = () => {
	const [codigoLote, setCodigoLote] = useState('')
	const [cantidad, setCantidad] = useState('')
	const [origen, setOrigen] = useState('')
	const [ubicacion, setUbicacion] = useState('')
	const [calidad, setCalidad] = useState(selectOptions[0])
	const [granulometria10, setGranulometria10] = useState('')
	const [granulometria50, setGranulometria50] = useState('')
	const [granulometria90, setGranulometria90] = useState('')
	const [aluminio, setAluminio] = useState('')
	const [calcio, setCalcio] = useState('')
	const [hierro, setHierro] = useState('')
	const [titanio, setTitanio] = useState('')
	const [totalImpurezas, setTotalImpurezas] = useState('')
	const [analisis, setAnalisis] = useState('')
	const [granulometria, setGranulometria] = useState('')

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Box sx={{ width: '700px', padding: '20px' }}>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<Grid item xs={4} sm={8} md={12}>
						<h4>Información general:</h4>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Código lote" variant='outlined' value={codigoLote} onChange={ev => setCodigoLote(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Cantidad (kg)" variant='outlined' value={cantidad} onChange={ev => setCantidad(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Origen" variant='outlined' value={origen} onChange={ev => setOrigen(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Ubicación" variant='outlined' value={ubicacion} onChange={ev => setUbicacion(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<Select value={calidad} onChange={ev => setCalidad(ev.target.value)} sx={{width: '100%'}}>
							{selectOptions.map(option => {
								return <MenuItem value={option} key={option}>{option}</MenuItem>
							})}
						</Select>
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<h4>Granulometría:</h4>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="10" variant='outlined' value={granulometria10} onChange={ev => setGranulometria10(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="50" variant='outlined' value={granulometria50} onChange={ev => setGranulometria50(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="90" variant='outlined' value={granulometria90} onChange={ev => setGranulometria90(ev.target.value)} />	
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{maxWidth: "500px"}} onChange={ev => setGranulometria(ev.target.value)} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<h4>Análisis:</h4>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Aluminio" variant='outlined' value={aluminio} onChange={ev => setAluminio(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Calcio" variant='outlined' value={calcio} onChange={ev => setCalcio(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Hierro" variant='outlined' value={hierro} onChange={ev => setHierro(ev.target.value)} />	
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Titanio" variant="outlined" value={titanio} onChange={ev => setTitanio(ev.target.value)} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Total impurezas" variant="outlined" value={totalImpurezas} onChange={ev => setTotalImpurezas(ev.target.value)} />
					</Grid>

					<Grid item xs={4} sm={8} md={12}>
						<Form.Control type="file" style={{maxWidth: "500px"}} onChange={ev => setAnalisis(ev.target.value)} />
					</Grid>

					<Grid item xs={4} sm={8} md={12} sx={{display: 'flex', justifyContent: 'end'}}>
						<Button 
							variant='contained' 
							size='large'
							onClick={() => {
								let resultado = {
									codigoLote: codigoLote,
									cantidad: cantidad,
									origen: origen,
									ubicacion: ubicacion,
									calidad: calidad,
									granulometria10: granulometria10,
									granulometria50: granulometria50,
									granulometria90: granulometria90,
									aluminio: aluminio,
									calcio: calcio,
									hierro: hierro,
									titanio: titanio,
									totalImpurezas: totalImpurezas
								}
							}}
						>Guardar</Button>
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}

export default Entradas