import { Suspense, useState } from 'react';
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import TextInputDate from '../components/TextInputDate';
import TextInputFile from '../components/TextInputFile';
import { entradas, entradasFile } from '../api/endpoints';
import { postHeader } from '../api/fetchHeader';
export const Produccion = () => {
  const [newCode, setNewCode] = useState('')
  const [date, setDate] = useState()
  const [amount, setAmount] = useState('')
  const [quality, setQuality] = useState('')
  const [originCode, setOriginCode] = useState('')
  const [chemicalAnalysis, setChemicalAnalysis] = useState()
  const [hash, setHash] = useState()

  const clickHandler = async () => {
    const file = chemicalAnalysis
    const formData = new FormData();
    formData.append('fileAnalisis', file)
    await fetch(entradasFile, { method: 'POST', body: formData, })
    const analysisUrl = `https://silicio.blob.core.windows.net/analisis-lotes/${file.name}`
    const bodyData = JSON.stringify({
      "code": newCode,
      "date": date,
      "amount": amount,
      "analysis": analysisUrl,
      "quality": quality,
      "origin": originCode
    })
    const response = await fetch(entradas, { method: 'POST', headers: postHeader, body: bodyData, })
    setHash(await response.json())
  }
  const selectOptions = ["Calidad", "2N", "3N", "4N", "5N", "Reciclado"]
  console.log(hash)
  return (
    <div>
      <TextInput type={"Origen"} func={setOriginCode} />
      <TextInput type={'Código Lote'} setter={setNewCode} />
      <TextInputDate setter={setDate} />
      <TextInput type={'Cantidad'} setter={setAmount} />
      <SelectInput options={selectOptions} setter={setQuality} />
      <label>Resultado análisis</label>
      <TextInputFile func={setChemicalAnalysis} />
      <button onClick={clickHandler}>Registrar</button>
      <Suspense fallback={''}>{hash}</Suspense>

    </div>

  )
}
