import { useState} from 'react';
//import {ErrorBoundary} from 'react-error-boundary'
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import TextInputDate from '../components/TextInputDate';
import TextInputFile from '../components/TextInputFile';
import { entradas, entradasFile } from '../api/endpoints';
import { postHeader } from '../api/fetchHeader';
import '../styles/global.css'
import { ShowHash } from '../components/ShowHash';
import { Loading } from '../components/Loading';

export const Entradas = () => {
  const [code, setCode] = useState('')
  const [date, setDate] = useState()
  const [amount, setAmount] = useState('')
  const [quality, setQuality] = useState('')
  const [origin, setOrigin] = useState('')
  const [analysis, setAnalysis] = useState()
  const [hash, setHash] = useState(undefined)
  const selectOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
  const buttonDisabledCondition = !code || !amount || !quality || !date || !origin

  const clickHandler = async () => {
    setHash('loading')
    const file = analysis
    const formData = new FormData();
    formData.append('fileAnalisis', file)
    await fetch(entradasFile, { method: 'POST', body: formData, })
    const analysisUrl = file === undefined ? 'No hay información' : `https://silicio.blob.core.windows.net/analisis-lotes/${file.name}`
    const bodyData = JSON.stringify({
      "code": code,
      "date": date,
      "amount": amount,
      "analysis": analysisUrl,
      "quality": quality,
      "origin": origin
    })
    const response = await fetch(entradas, { method: 'POST', headers: postHeader, body: bodyData, })
    if (response.ok) {
      setHash(await response.json())
      setAmount('')
      setCode('')
      setOrigin('')
      setQuality('')
    } else {
      setHash(undefined)
      alert(`
      Error registrando información del lote ${code}.
      Revisa que ese lote no haya sido registrado`)
      return (
        <div className='web-wrapper'>
          <h3>Error al registrar en la blockchain</h3>
          <h4><i>Realiza la operación más tarde</i></h4>
        </div>
      )
    }

  }

  return (
    <div className='web-wrapper'>
      <h1>Registrar entrada de lotes</h1>
      <TextInput type={'Código Lote'} setter={setCode} value={code} />
      <TextInputDate setter={setDate} />
      <TextInput type={'Cantidad (kg)'} setter={setAmount} value={amount} />
      <TextInput type={"Origen"} setter={setOrigin} value={origin}/>
      <SelectInput options={selectOptions} setter={setQuality}  value={quality}/>
      <div className='div-file-title'>
        <label className='file-title'>Resultado análisis</label>
        <TextInputFile setter={setAnalysis} />
      </div>

      <button onClick={clickHandler} className='bt-registrar' disabled={buttonDisabledCondition}>Registrar</button>

      {hash !== undefined && hash.startsWith('0x') &&  <ShowHash txHash={hash} />}
      {hash === 'loading' &&  <Loading text={"Registrando"} />}
      <br />
    </div>

  )

}