import { useState, useEffect } from 'react'
import { productosEndpoints } from '../../api/endpoints'
import { TablaProductos } from './TablaProductos'

export const GestionStockProductos = () => {
    const [productos, setProductos] = useState(null)
    const [errorLoadingProductos, setErrorLoadingProductos] = useState(false)

    useEffect(() => {
        const callback = async () => {
            try {
                const response = await fetch(productosEndpoints.getProductos)

                if (response.ok) {
                    setProductos(await response.json())
                }
                else {
                    throw new Error()
                }
            }
            catch {
                setErrorLoadingProductos(true)
            }
        }

        callback()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {/* <TablaProductos productos={productos} errorLoadingProductos={errorLoadingProductos} /> */}
            </div>
        </div>
    )
}