import { useState, useEffect} from 'react';
import { entradas } from '../api/endpoints';
export const VerStockEntradas = () => {
const [lotesCode, setLotesCode] = useState()

  useEffect(()=> {
    fetch(entradas).then((allLotes)=> {
      setLotesCode(allLotes)
    })
  },[])
    console.log(lotesCode)
    return(<div></div>)
}