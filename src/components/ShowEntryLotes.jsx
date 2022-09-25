import { React, useEffect, useState } from 'react';
import { entradas } from '../api/endpoints';
import { header } from '../api/fetchHeader';
import { Loading } from './Loading';
import '../styles/showLotesCodes.css'

export const ShowEntryLotes = () => {
  const [lotesCode, setLotesCode] = useState([])

  const fetchAllLotes = async () => {
    const data = await fetch(entradas, header)
    setLotesCode(await data.json())
  }

  useEffect(() => {
    if (lotesCode.length === 0) fetchAllLotes()
  }, [lotesCode])

  return (
    <div className='bt-lotes-wrapper'>
      <h2>Ver Lotes de Entrada</h2>
      {lotesCode.length > 0 
        ? lotesCode.map((lote, index) => <button key={index} className="bt-lotes">{lote}</button>)
        : <Loading text={"Cargando"} />}
    </div>
  )
}