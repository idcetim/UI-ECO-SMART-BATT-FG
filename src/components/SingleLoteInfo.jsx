
import { useEffect, useState } from 'react';
import { React } from 'react';
import { entradas } from '../api/endpoints';
import { header } from '../api/fetchHeader';
import { TableLote } from './TableLote';

export const SingleLoteInfo = (props) => {
  const [loteData, setData] = useState(null)
  const [hashData, setHashData] = useState(null)

  const fetchLote = async (loteCode) => {
    const data = await fetch(`${entradas}/${loteCode}`, header)
    setData(await data.json())
  }

  const fetchHash = async (loteCode) => {
    const data = await fetch(`${entradas}/hash/${loteCode}`, header)
    setHashData(await data.json())
  }

  useEffect(() => { 
    fetchLote(props.loteCode) 
    fetchHash(props.loteCode)
  }, [props.loteCode])
 
  return (
    <div>
      {(loteData === null && hashData === null) ? "Loading" : <TableLote loteData = {loteData} hashData = {hashData}/> }
    </div>
  )

}