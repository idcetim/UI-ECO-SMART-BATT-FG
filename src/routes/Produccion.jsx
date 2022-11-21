import { useState } from 'react';
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import TextInputDate from '../components/TextInputDate';
import TextInputFile from '../components/TextInputFile';
import { produccion, produccionOrdenFile, produccionQuimicoFile, produccionGranulometricoFile } from '../api/endpoints';
import { postHeader } from '../api/fetchHeader';
import { ShowHash } from '../components/ShowHash';
import { Loading } from '../components/Loading';
import Form from 'react-bootstrap/Form';
import '../styles/global.css'

export const Produccion = () => {
	const [newCode, setNewCode] = useState('')
	const [date, setDate] = useState()
	const [amount, setAmount] = useState('')
	const [quality, setQuality] = useState('')
	const [productType, setProductType] = useState('')
	const [originCode, setOriginCode] = useState('')
	const [chemicalAnalysis, setChemicalAnalysis] = useState(undefined)
	const [granuAnalysis, setGranuAnalysis] = useState(undefined)
	const [workOrder, setWorkOrder] = useState(undefined)
	const [hash, setHash] = useState(undefined)
	const buttonDisabledCondition = !newCode || !amount || !quality || !date || !originCode

	const clickHandler = async () => {
		let chemicalAnalysisUrl
		let granuAnalysisUrl
		let workOrderUrl
		setHash('loading')
		if (chemicalAnalysis === undefined) chemicalAnalysisUrl = 'No hay información'
		else {
			const formData1 = new FormData();
			formData1.append('fileQuimico', chemicalAnalysis)
			await fetch(produccionQuimicoFile, { method: 'POST', body: formData1, })
			chemicalAnalysisUrl = `https://silicio.blob.core.windows.net/quimico-producto/${chemicalAnalysis.name}`
		}
		if (granuAnalysis === undefined) granuAnalysisUrl = 'No hay información'
		else {
			const formData2 = new FormData();
			formData2.append('fileGranulometria', granuAnalysis)
			await fetch(produccionGranulometricoFile, { method: 'POST', body: formData2, })
			granuAnalysisUrl = `https://silicio.blob.core.windows.net/granulometria-producto/${granuAnalysis.name}`
		}
		if (workOrder === undefined) workOrderUrl = 'No hay información'
		else {
			const formData3 = new FormData();
			formData3.append('fileOrden', workOrder)
			await fetch(produccionOrdenFile, { method: 'POST', body: formData3, })
			workOrderUrl = `https://silicio.blob.core.windows.net/orden-trabajo/${workOrder.name}`
		}
		const bodyData = JSON.stringify({
			"code": newCode,
			"date": date,
			"amount": amount,
			"order": workOrderUrl,
			"productType": productType,
			"chemicalAnalysis": chemicalAnalysisUrl,
			"granuAnalysis": granuAnalysisUrl,
			"quality": quality,
			"originCode": originCode
		})
		const response = await fetch(produccion, { method: 'POST', headers: postHeader, body: bodyData, })
		if (response.ok) setHash(await response.json())
		else {
			setHash(undefined)
			alert(`
      Error registrando información del lote ${newCode}.
      Revisa que ese lote no haya sido registrado`)
			return (
				<div className='web-wrapper'>
					<h3>Error al registrar en la blockchain</h3>
					<h4><i>Realiza la operación más tarde</i></h4>
				</div>
			)
		}

	}
	const selectQualityOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
	const selectProductTypeOptions = ["Tipo de producto", "0.2 - 2 mm", "< 0.5 mm"]

	return (
		<div className='web-wrapper'>
			<h2>Registrar producto final</h2>
			<TextInput type={"Código lote de origen"} setter={setOriginCode} />
			<TextInput type={'Código nuevo producto'} setter={setNewCode} />
			<TextInputDate setter={setDate} />
			<SelectInput options={selectProductTypeOptions} setter={setProductType} />
			<TextInput type={'Cantidad (kg)'} setter={setAmount} />
			<SelectInput options={selectQualityOptions} setter={setQuality} />

			<div className='div-file-title'>
				<label className='file-title'>Resultado análisis químico</label>
				<Form.Control 
					type="file" 
					style={{maxWidth: '500px'}} 
					onChange={ev => {
						setChemicalAnalysis(ev.target.files[0])
					}}
				/>
				{/* <TextInputFile setter={setChemicalAnalysis} /> */}
			</div>
			<div className='div-file-title'>
				<label className='file-title'>Resultado análisis granulométrico</label>
				<Form.Control 
					type="file" 
					style={{maxWidth: "500px"}} 
					onChange={ev => {
						setGranuAnalysis(ev.target.files[0])
					}}
				/>
				{/* <TextInputFile setter={setGranuAnalysis} /> */}
			</div>
			<div className='div-file-title'>
				<label className='file-title'>Orden de trabajo</label>
				<Form.Control 
					type="file" 
					style={{maxWidth: "500px"}} 
					onChange={ev => {
						setWorkOrder(ev.target.files[0])
					}}
				/>
				{/* <TextInputFile setter={setWorkOrder} /> */}
			</div>

			<button onClick={clickHandler} className='bt-registrar' disabled={buttonDisabledCondition}>Registrar</button>
			{hash !== undefined && hash.startsWith('0x') && <ShowHash txHash={hash} />}
			{hash === 'loading' && <Loading text={"Registrando"} />}
			<br />
		</div>

	)
}
