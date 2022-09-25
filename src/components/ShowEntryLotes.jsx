import { React,  useEffect, useState } from 'react';
import { entradas } from '../api/endpoints';
import { header } from '../api/fetchHeader';
export const ShowEntryLotes = () => {
  const [lotesCode, setLotesCode] = useState([])

  const fetchAllLotes = async () => {
    const data = await fetch(entradas, header)
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