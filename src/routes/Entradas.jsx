import { useState } from 'react';
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import TextInputDate from '../components/TextInputDate';
import { entradas, entradasFile } from '../api/endpoints';
import { postHeader } from '../api/fetchHeader';
import '../styles/global.css'
import { ShowHash } from '../components/ShowHash';
import { Loading } from '../components/Loading';
import Form from 'react-bootstrap/Form'
import Typography from '@mui/material/Typography'
import { TextField, Grid, Paper, Box, Select, Button, MenuItem } from '@mui/material';

// const Entradas = () => {
// 	const [code, setCode] = useState('')
// 	const [date, setDate] = useState()
// 	const [amount, setAmount] = useState('')
// 	const [quality, setQuality] = useState('')
// 	const [location, setLocation] = useState('')
// 	const [origin, setOrigin] = useState('')
// 	const [analysis, setAnalysis] = useState()
// 	const [hash, setHash] = useState(undefined)
// 	const [granulometria, setGranulometria] = useState('')
// 	const selectOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
// 	const buttonDisabledCondition = !code || !amount || !quality || !date || !origin

// 	const clickHandler = async () => {
// 		setHash('loading')
// 		const file = analysis
// 		const formData = new FormData();
// 		formData.append('fileAnalisis', file)
// 		await fetch(entradasFile, { method: 'POST', body: formData, })
// 		const analysisUrl = file === undefined ? 'No hay información' : `https://silicio.blob.core.windows.net/analisis-lotes/${file.name}`
// 		const bodyData = JSON.stringify({
// 			"code": code,
// 			"date": date,
// 			"amount": amount,
// 			"analysis": analysisUrl,
// 			"quality": quality,
// 			"origin": origin,
// 			"granulometria": granulometria
// 		})
// 		const response = await fetch(entradas, { method: 'POST', headers: postHeader, body: bodyData, })

// 		if (response.ok) {
// 			setHash(await response.json())
// 			setAmount('')
// 			setCode('')
// 			setOrigin('')
// 			setQuality('')
// 			setLocation('')
// 			setGranulometria('')
// 		} else {
// 			setHash(undefined)
// 			alert(`Error registrando información del lote ${code}. Revisa que ese lote no haya sido registrado`)
// 			return (
// 				<div className='web-wrapper'>
// 					<h3>Error al registrar en la blockchain</h3>
// 					<h4><i>Realiza la operación más tarde</i></h4>
// 				</div>
// 			)
// 		}
// 	}

// 	return (
// 		<div className='web-wrapper'>
// 			<Typography variant="h5" sx={{mb: 2, fontWeight: 500}}>Registrar materias primas</Typography>
// 			<TextInput type={'Código Lote'} setter={setCode} value={code} />
// 			<TextInputDate setter={setDate} />
// 			<TextInput type={'Cantidad (kg)'} setter={setAmount} value={amount} />
// 			<TextInput type={"Origen"} setter={setOrigin} value={origin} />
// 			<TextInput type={'Ubicación'} setter={setLocation} value={location} />
// 			<TextInput type={'Granulometría'} setter={setGranulometria} value={granulometria} />
// 			<SelectInput options={selectOptions} setter={setQuality} value={quality} />
// 			<div className='div-file-title'>
// 				<label className='file-title'>Resultado análisis</label>
// 				{/* <TextInputFile setter={setAnalysis} /> */}
// 				<Form.Control
// 					type="file"
// 					style={{maxWidth: "500px"}}
// 					onChange={ev => {
// 						setAnalysis(ev.target.files[0])
// 					}}
// 				/>
// 			</div>

// 			<button onClick={clickHandler} className='bt-registrar' disabled={buttonDisabledCondition}>Registrar</button>

// 			{hash !== undefined && hash.startsWith('0x') && <ShowHash txHash={hash} />}
// 			{hash === 'loading' && <Loading text={"Registrando"} />}
// 			<br />
// 		</div>
// 	)
// }

// export default Entradas

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