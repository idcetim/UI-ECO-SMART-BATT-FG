
import { useEffect, useState } from 'react';
import { React } from 'react';
import { entradas, produccion } from '../api/endpoints';
import { header } from '../api/fetchHeader';
import { Loading } from './Loading';
import { TableLote } from './TableLote';

export const SingleLoteInfo = ({ loteCode, type }) => {
  const [loteData, setData] = useState(null)
  const [hashData, setHashData] = useState(null)
  useEffect(() => {
    (async function () {
      const url = type === "Entry" ? `${entradas}/${loteCode}` : `${produccion}/${loteCode}`
      const data = await fetch(url, header)
      setData(await data.json())
    })()
  }, [loteCode, type])

  useEffect(() => {
    (async function (){
      const url = type === "Entry" ? `${entradas}/hash/${loteCode}` : `${produccion}/hash/${loteCode}`
      const data = await fetch(url, header)
      setHashData(await data.json())
    })()
  }, [loteCode, type])

  return (
    <div>
      {(loteData === null || hashData === null)
        ? <Loading text={"Cargando"} />
        : <TableLote loteData={loteData} hashData={hashData} type={type} />}
    </div>
  )

}