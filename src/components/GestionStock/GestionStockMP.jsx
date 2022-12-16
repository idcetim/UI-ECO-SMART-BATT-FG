import { useState, useEffect } from 'react'
import FileUploadButton from '../UploadFileButton'
import { mmppEndpoints } from '../../api/endpoints'
import { TablaLotesCSV } from './TablaLotesCSV'
import { TablaMMPP_BD } from './TablaMMPP_BD'
import { readLotesFromCSV } from '../../helpers/readLotesFromCSV'

export const GestionStockMP = () => {
  const [lotesBD, setLotesBD] = useState(null)
  const [lotesCSV, setLotesCSV] = useState([])
  const [errorLoadingLotes, setErrorLoadingLotes] = useState(false)

  useEffect(() => {
    const callback = async () => {
      try {
        const response = await fetch(mmppEndpoints.getMMPP)

        if (response.ok) {
          setLotesBD(await response.json())
        }
        else {
          setErrorLoadingLotes(true)
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
            <TablaMMPP_BD lotesBD={lotesBD} errorLoadingLotes={errorLoadingLotes} />
        }
      </div>
    </div>
  )
}