import { useState, useEffect } from 'react'
import { ordenesTrabajoEndpoints } from '../../api/endpoints'
import { TablaOrdenesTrabajo } from './TablaOrdenesTrabajo'

export const GestionStockOrdenTrabajo = ({rol}) => {
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TablaOrdenesTrabajo ordenesTrabajo={ordenesTrabajo} errorLoadingOrdenesTrabajo={errorLoadingOrdenesTrabajo} rol={rol} />
            </div>
        </div>
    )
}