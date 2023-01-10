import { useState, useEffect } from 'react'
import FileUploadButton from '../UploadFileButton'
import { mmppEndpoints } from '../../api/endpoints'
import { TablaLotesCSV } from './TablaLotesCSV'
import { TablaMMPP } from './TablaMMPP'
import { readLotesFromCSV } from '../../helpers/readLotesFromCSV'

export const GestionStockMP = ({rol}) => {
  const [materiasPrimas, setMateriasPrimas] = useState(null)
  const [lotesCSV, setLotesCSV] = useState([])
  const [errorLoadingLotes, setErrorLoadingLotes] = useState(false)

  useEffect(() => {
    const callback = async () => {
      try {
        const response = await fetch(mmppEndpoints.getMMPP)

        if (response.ok) {
          setMateriasPrimas(await response.json())
        }
        else {
          throw new Error(9)
        }
      }
      catch {
        setErrorLoadingLotes(true)
      }
    }

    callback()
  }, [])

  const handleFileChange = async (e) => {
    let newLotesData = []

    if (e.target !== null && e.target.files.length > 0) {
      for (const file of e.target.files) {
        const fileExtension = file?.type.split("/")[1]

        if (["csv"].includes(fileExtension)) {
          newLotesData = newLotesData.concat(await readLotesFromCSV(file))
        }
      }
    }

    if (newLotesData.length > 0) {
      setLotesCSV(newLotesData)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5%' }}>
        <FileUploadButton
          handleFileUpload={handleFileChange}
          title={'Leer lotes de fichero'}
          callback={() => setLotesCSV([])}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          lotesCSV.length > 0 ?
            <TablaLotesCSV lotesData={lotesCSV} />
            :
            <TablaMMPP 
              materiasPrimas={materiasPrimas} 
              errorLoadingLotes={errorLoadingLotes} 
              setMateriasPrimas={setMateriasPrimas}
              rol={rol}
            />
        }
      </div>
    </div>
  )
}