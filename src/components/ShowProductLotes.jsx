import { React, useEffect, useState } from 'react';
import { produccion } from '../api/endpoints';
import { header } from '../api/fetchHeader';
import { Loading } from './Loading';
import { SingleLoteInfo } from './SingleLoteInfo';
import '../styles/showLotesCodes.css'
import '../styles/global.css'

export const ShowProductLotes = () => {
  const [lotesCode, setLotesCode] = useState([])
  const [singleLote, setSingleLote] = useState(null)

  const fetchAllLotes = async () => {
    const data = await fetch(produccion, header)
    setLotesCode(await data.json())
  }

  useEffect(() => {
    if (lotesCode.length === 0) fetchAllLotes()
  }, [lotesCode])
 
  return (
    <div className='web-wrapper'>
      <div className='bt-lotes-wrapper'>
        <h2>Ver Producto final</h2>
        {lotesCode.length > 0
          ? lotesCode.map((lote, index) => <button key={index} className="bt-lotes" onClick={() => setSingleLote(lote)}>{lote}</button>)
          : <Loading text={"Cargando"} />}
      </div>
      {singleLote !== null && <SingleLoteInfo loteCode={singleLote} type={"Product"} />}
    </div>
  )
}