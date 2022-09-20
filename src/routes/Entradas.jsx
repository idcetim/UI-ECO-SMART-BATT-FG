import { Suspense, useState } from 'react';
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import TextInputDate from '../components/TextInputDate';
import TextInputFile from '../components/TextInputFile';
import { entradas, entradasFile } from '../api/endpoints';
import { postHeader } from '../api/fetchHeader';
import '../styles/global.css'

export const Entradas = () => {
  const [code, setCode] = useState('')
  const [date, setDate] = useState()
  const [amount, setAmount] = useState('')
  const [quality, setQuality] = useState('')
  const [origin, setOrigin] = useState('')
  const [analysis, setAnalysis] = useState()
  const [hash, setHash] = useState()

  const clickHandler = async () => {
    const file = analysis
    const formData = new FormData();
    formData.append('fileAnalisis', file)
    await fetch(entradasFile, { method: 'POST', body: formData, })
    const analysisUrl = `https://silicio.blob.core.windows.net/analisis-lotes/${file.name}`
    const bodyData = JSON.stringify({
      "code": code,
      "date": date,
      "amount": amount,
      "analysis": analysisUrl,
      "quality": quality,
      "origin": origin
    })
    const response = await fetch(entradas, { method: 'POST', headers: postHeader, body: bodyData, })
    setHash(await response.json())
  }
  const selectOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
  console.log(hash)
  return (
    <div className='web-wrapper'>
      <h1>Registrar entrada de lotes</h1>
      <TextInput type={'Código Lote'} setter={setCode} />
      <TextInputDate setter={setDate} />
      <TextInput type={'Cantidad'} setter={setAmount} />
      <TextInput type={"Origen"} func={setOrigin} />
      <SelectInput options={selectOptions} setter={setQuality} />
      <div className='div-file-title'>
        <label className='file-title'>Resultado análisis</label>
        <TextInputFile func={setAnalysis} />
      </div>

      <button onClick={clickHandler} className='bt-registrar'>Registrar</button>
      <Suspense fallback={''}>{hash}</Suspense>

    </div>

  )

}