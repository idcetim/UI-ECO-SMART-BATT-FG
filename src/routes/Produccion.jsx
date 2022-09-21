import { Suspense, useState } from 'react';
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import TextInputDate from '../components/TextInputDate';
import TextInputFile from '../components/TextInputFile';
import { produccion, produccionOrdenFile, produccionQuimicoFile, produccionGranulometricoFile } from '../api/endpoints';
import { postHeader } from '../api/fetchHeader';
import '../styles/global.css'

export const Produccion = () => {
  const [newCode, setNewCode] = useState('')
  const [date, setDate] = useState()
  const [amount, setAmount] = useState('')
  const [quality, setQuality] = useState('')
  const [originCode, setOriginCode] = useState('')
  const [chemicalAnalysis, setChemicalAnalysis] = useState()
  const [granuAnalysis, setGranuAnalysis] = useState()
  const [workOrder, setWorkOrder] = useState()
  const [hash, setHash] = useState()

  const clickHandler = async () => {
    const formData1 = new FormData();
    formData1.append('fileQuimico', chemicalAnalysis)
    await fetch(produccionQuimicoFile, { method: 'POST', body: formData1, })
    const formData2 = new FormData();
    formData2.append('fileGranulometria', granuAnalysis)
    await fetch(produccionGranulometricoFile, { method: 'POST', body: formData2, })
    const formData3 = new FormData();
    formData3.append('fileOrden', workOrder)
    await fetch(produccionOrdenFile, { method: 'POST', body: formData3, })
    const workOrderUrl = `https://silicio.blob.core.windows.net/orden-trabajo/${workOrder.name}`
    const granuAnalysisUrl = `https://silicio.blob.core.windows.net/granulometria-producto/${granuAnalysis.name}`
    const chemicalAnalysisUrl = `https://silicio.blob.core.windows.net/quimico-producto/${chemicalAnalysis.name}`
    const bodyData = JSON.stringify({
      "code": newCode,
      "date": date,
      "amount": amount,
      "order": workOrderUrl,
      "chemicalAnalysis": chemicalAnalysisUrl,
      "granuAnalysis": granuAnalysisUrl,
      "quality": quality,
      "originCode": originCode
    })
    const response = await fetch(produccion, { method: 'POST', headers: postHeader, body: bodyData, })
    setHash(await response.json())
  }
  const selectOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
  console.log(hash)
  return (
    <div className='web-wrapper'>
      <h2>Registrar producto final</h2>
      <TextInput type={"Código lote de origen"} func={setOriginCode} />
      <TextInput type={'Código Lote producto'} setter={setNewCode} />
      <TextInputDate setter={setDate} />
      <TextInput type={'Cantidad (kg)'} setter={setAmount} />
      <SelectInput options={selectOptions} setter={setQuality} />
      <div className='div-file-title'>
        <label className='file-title'>Orden de trabajo</label>
        <TextInputFile func={setWorkOrder} />
      </div>
      <div className='div-file-title'>
        <label className='file-title'>Resultado análisis químico</label>
        <TextInputFile func={setChemicalAnalysis} />
      </div>
      <div className='div-file-title'>
        <label className='file-title'>Resultado análisis granulométrico</label>
        <TextInputFile func={setGranuAnalysis} />
      </div>

      <button onClick={clickHandler} className='bt-registrar'>Registrar</button>
      <Suspense fallback={''}>{hash}</Suspense>

    </div>

  )
}
