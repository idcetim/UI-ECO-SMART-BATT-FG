import { useState } from 'react';
import '../styles/global.css'
import { TextField, Box, Grid, Button, Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// export const Produccion = () => {
// 	const [newCode, setNewCode] = useState('')
// 	const [date, setDate] = useState()
// 	const [amount, setAmount] = useState('')
// 	const [quality, setQuality] = useState('')
// 	const [location, setLocation] = useState('')
// 	const [productType, setProductType] = useState('')
// 	const [originCode, setOriginCode] = useState('')
// 	const [chemicalAnalysis, setChemicalAnalysis] = useState(undefined)
// 	const [granuAnalysis, setGranuAnalysis] = useState(undefined)
// 	const [workOrder, setWorkOrder] = useState(undefined)
// 	const [hash, setHash] = useState(undefined)
// 	const buttonDisabledCondition = !newCode || !amount || !quality || !date || !originCode

// 	const clickHandler = async () => {
// 		let chemicalAnalysisUrl
// 		let granuAnalysisUrl
// 		let workOrderUrl
// 		setHash('loading')
// 		if (chemicalAnalysis === undefined) chemicalAnalysisUrl = 'No hay información'
// 		else {
// 			const formData1 = new FormData();
// 			formData1.append('fileQuimico', chemicalAnalysis)
// 			await fetch(produccionQuimicoFile, { method: 'POST', body: formData1, })
// 			chemicalAnalysisUrl = `https://silicio.blob.core.windows.net/quimico-producto/${chemicalAnalysis.name}`
// 		}
// 		if (granuAnalysis === undefined) granuAnalysisUrl = 'No hay información'
// 		else {
// 			const formData2 = new FormData();
// 			formData2.append('fileGranulometria', granuAnalysis)
// 			await fetch(produccionGranulometricoFile, { method: 'POST', body: formData2, })
// 			granuAnalysisUrl = `https://silicio.blob.core.windows.net/granulometria-producto/${granuAnalysis.name}`
// 		}
// 		if (workOrder === undefined) workOrderUrl = 'No hay información'
// 		else {
// 			const formData3 = new FormData();
// 			formData3.append('fileOrden', workOrder)
// 			await fetch(produccionOrdenFile, { method: 'POST', body: formData3, })
// 			workOrderUrl = `https://silicio.blob.core.windows.net/orden-trabajo/${workOrder.name}`
// 		}
// 		const bodyData = JSON.stringify({
// 			"code": newCode,
// 			"date": date,
// 			"amount": amount,
// 			"order": workOrderUrl,
// 			"productType": productType,
// 			"chemicalAnalysis": chemicalAnalysisUrl,
// 			"granuAnalysis": granuAnalysisUrl,
// 			"quality": quality,
// 			"originCode": originCode
// 		})
// 		const response = await fetch(produccion, { method: 'POST', headers: postHeader, body: bodyData, })
// 		if (response.ok) setHash(await response.json())
// 		else {
// 			setHash(undefined)
// 			alert(`
//       Error registrando información del lote ${newCode}.
//       Revisa que ese lote no haya sido registrado`)
// 			return (
// 				<div className='web-wrapper'>
// 					<h3>Error al registrar en la blockchain</h3>
// 					<h4><i>Realiza la operación más tarde</i></h4>
// 				</div>
// 			)
// 		}

// 	}
// 	const selectQualityOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
// 	const selectProductTypeOptions = ["Tipo de producto", "0.2 - 2 mm", "< 0.5 mm"]

// 	return (
// 		<div className='web-wrapper'>
// 			<Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>Registrar producto</Typography>
// 			<TextInput type={"Código lote de origen"} setter={setOriginCode} />
// 			<TextInput type={'Código nuevo producto'} setter={setNewCode} />
// 			<TextInputDate setter={setDate} />
// 			<TextInput type={'Ubicación'} setter={setLocation} value={location} />
// 			<TextInput type={'Cantidad (kg)'} setter={setAmount} />
// 			<SelectInput options={selectProductTypeOptions} setter={setProductType} />
// 			<SelectInput options={selectQualityOptions} setter={setQuality} />

// 			<div className='div-file-title'>
// 				<label className='file-title'>Resultado análisis químico</label>
// 				<Form.Control 
// 					type="file" 
// 					style={{maxWidth: '500px'}} 
// 					onChange={ev => {
// 						setChemicalAnalysis(ev.target.files[0])
// 					}}
// 				/>
// 				{/* <TextInputFile setter={setChemicalAnalysis} /> */}
// 			</div>
// 			<div className='div-file-title'>
// 				<label className='file-title'>Resultado análisis granulométrico</label>
// 				<Form.Control 
// 					type="file" 
// 					style={{maxWidth: "500px"}} 
// 					onChange={ev => {
// 						setGranuAnalysis(ev.target.files[0])
// 					}}
// 				/>
// 				{/* <TextInputFile setter={setGranuAnalysis} /> */}
// 			</div>
// 			<div className='div-file-title'>
// 				<label className='file-title'>Orden de trabajo</label>
// 				<Form.Control 
// 					type="file" 
// 					style={{maxWidth: "500px"}} 
// 					onChange={ev => {
// 						setWorkOrder(ev.target.files[0])
// 					}}
// 				/>
// 				{/* <TextInputFile setter={setWorkOrder} /> */}
// 			</div>

// 			<button onClick={clickHandler} className='bt-registrar' disabled={buttonDisabledCondition}>Registrar</button>
// 			{hash !== undefined && hash.startsWith('0x') && <ShowHash txHash={hash} />}
// 			{hash === 'loading' && <Loading text={"Registrando"} />}
// 			<br />
// 		</div>

// 	)
// }


const selectQualityOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
const selectProductTypeOptions = ["Tipo de producto", "0.2 - 2 mm", "< 0.5 mm"]

const Produccion = () => {
	const [codigoLoteOrigen, setCodigoLoteOrigen] = useState('')
	const [codigoNuevoProducto, setCodigoNuevoProducto] = useState('')
	const [fecha, setFecha] = useState(null);
	const [ubicacion, setUbicacion] = useState('')
	const [cantidad, setCantidad] = useState('')
	const [calidad, setCalidad] = useState(selectQualityOptions[0])
	const [tipoProducto, setTipoProducto] = useState(selectProductTypeOptions[0])
	const [granulometria10, setGranulometria10] = useState('')
	const [granulometria50, setGranulometria50] = useState('')
	const [granulometria90, setGranulometria90] = useState('')
	const [aluminio, setAluminio] = useState('')
	const [calcio, setCalcio] = useState('')
	const [hierro, setHierro] = useState('')
	const [titanio, setTitanio] = useState('')
	const [totalImpurezas, setTotalImpurezas] = useState('')

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Box sx={{ width: '700px', padding: '20px' }}>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<Grid item xs={4} sm={8} md={12}>
						<h4>Registrar producto:</h4>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Código lote de origen" variant='outlined' value={codigoLoteOrigen} onChange={ev => setCodigoLoteOrigen(ev.target.value)} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Código nuevo producto" variant='outlined' value={codigoNuevoProducto} onChange={ev => setCodigoNuevoProducto(ev.target.value)} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label="Fecha"
								value={fecha}
								onChange={(newValue) => {
									setFecha(newValue);
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Ubicación" variant="outlined" value={ubicacion} onChange={ev => setUbicacion(ev.target.value)} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<TextField label="Cantidad (kg)" variant='outlined' value={cantidad} onChange={ev => setCantidad(ev.target.value)} />
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<Select value={calidad} onChange={ev => setCalidad(ev.target.value)} sx={{width: '100%'}}>
							{selectQualityOptions.map(option => {
								return <MenuItem value={option} key={option}>{option}</MenuItem>
							})}
						</ Select>
					</Grid>

					<Grid item xs={2} sm={4} md={4}>
						<Select value={tipoProducto} onChange={ev => setTipoProducto(ev.target.value)} sx={{width: '100%'}}>
							{selectProductTypeOptions.map(option => {
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

					<Grid item xs={4} sm={8} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
						<Button
							variant='contained'
							size='large'
							onClick={() => {
								let resultado = {
									codigoLoteOrigen: codigoLoteOrigen,
									codigoNuevoProducto: codigoNuevoProducto,
									fecha: fecha,
									ubicacion: ubicacion,
									cantidad: cantidad,
									calidad: calidad,
									tipoProducto: tipoProducto,
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

export default Produccion
