import { React, useEffect, useState } from 'react';
import { entradas } from '../api/endpoints';
import { header } from '../api/fetchHeader';
import { Loading } from './Loading';
import '../styles/global.css'
import '../styles/showLotesCodes.css'
import { SingleLoteInfo } from './SingleLoteInfo';

export const ShowEntryLotes = () => {
  const [lotesCode, setLotesCode] = useState([])
  const [singleLote, setSingleLote] = useState(null)

  const fetchAllLotes = async () => {
    const data = await fetch(entradas, header)
    setLotesCode(await data.json())
  }

  useEffect(() => {
    if (lotesCode.length === 0) fetchAllLotes()
  }, [lotesCode])

  return (
    <div className='web-wrapper'>
      <div className='bt-lotes-wrapper'>
        <h2>Ver Lotes de Entrada</h2>
        {lotesCode.length > 0
          ? lotesCode.map((lote, i) => <button key={i} className="bt-lotes" onClick={() => setSingleLote(lote)}>{lote}</button>)
          : <Loading text={"Cargando"} />}
      </div>
      <div>

        {singleLote !== null && <SingleLoteInfo loteCode={singleLote} />}

      </div>
    </div>
  )
}