import { React,  useEffect, useState } from 'react';
import { produccion } from '../api/endpoints';
import { header } from '../api/fetchHeader';
export const ShowProductLotes = () => {
  const [lotesCode, setLotesCode] = useState([])

  const fetchAllLotes = async () => {
    const data = await fetch(produccion, header)
    setLotesCode(await data.json())
  }

 useEffect(()=> {
  if(lotesCode.length === 0) fetchAllLotes()
 }, [lotesCode])
 
  return (
  <div>
    { lotesCode.length > 0 && lotesCode.map((lote, index) => {
      return <span key={index}>{lote}</span>
    })}
    </div>)
}