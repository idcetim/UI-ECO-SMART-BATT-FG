import { useState, useEffect } from 'react'
import { ordenesTrabajoEndpoints } from '../../api/endpoints'
import { TablaOrdenesTrabajo } from './TablaOrdenesTrabajo'

export const GestionStockOrdenTrabajo = () => {
    const [ordenesTrabajo, setOrdenesTrabajo] = useState(null)
    const [errorLoadingOrdenesTrabajo, setErrorLoadingOrdenesTrabajo] = useState(false)

    useEffect(() => {
        const callback = async () => {
            try {
                const response = await fetch(ordenesTrabajoEndpoints.getOrdenesTrabajo)

                if (response.ok) {
                    setOrdenesTrabajo(await response.json())
                }
                else {
                    throw new Error()
                }
            }
            catch {
                setErrorLoadingOrdenesTrabajo(true)
            }
        }

        callback()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5%' }}>
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
          </div> */}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TablaOrdenesTrabajo ordenesTrabajo={ordenesTrabajo} errorLoadingOrdenesTrabajo={errorLoadingOrdenesTrabajo} />
            </div>
        </div>
    )
}