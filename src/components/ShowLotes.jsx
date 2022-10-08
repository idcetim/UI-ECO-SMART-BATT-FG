import { React, useEffect, useState } from 'react';
import { entradas, produccion } from '../api/endpoints';
import { header } from '../api/fetchHeader';
import { Loading } from './Loading';
import { SingleLoteInfo } from './SingleLoteInfo';
import '../styles/showLotesCodes.css'
import '../styles/global.css'

export const ShowLotes = ({ type }) => {
  const [lotesCode, setLotesCode] = useState([])
  const [singleLote, setSingleLote] = useState(null)

 

  const fetchAllLotes = async () => {
    const url = type === "Product" ? produccion : entradas
    const data = await fetch(url, header)
    setLotesCode(await data.json())
  }

  useEffect(() => { 
    fetchAllLotes()
     // eslint-disable-next-line
   }, [])
 
  return (
    <div className='web-wrapper'>
      <div className='bt-lotes-wrapper'>
        {type === "Product" ? <h2>Ver Producto final</h2> : <h2>Ver Lotes de Entrada</h2> }
        {lotesCode.length > 0
          ? lotesCode.map((lote, index) => <button key={index} className="bt-lotes" onClick={() => setSingleLote(lote)}>{lote}</button>)
          : <Loading text={"Cargando"} />}
      </div>
      {singleLote !== null && <SingleLoteInfo loteCode={singleLote} type={type} />}
    </div>
  )
}