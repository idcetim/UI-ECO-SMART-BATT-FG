import React, { useState } from 'react'
import { Box } from '@mui/material'
import { TabPanelResumen } from '../components/TabPanelResumen'
import { StockTabsMenu } from '../components/GestionStock/StockTabsMenu'
import PanelResumenMMPP from '../components/Resumen/PanelResumenMMPP'
import PanelResumenOrdenes from '../components/Resumen/PanelResumenOrdenes'
import PanelResumenProductos from '../components/Resumen/PanelResumenProductos'

const Resumen = () => {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <Box sx={{width: '100%'}}>
            <StockTabsMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <TabPanelResumen value={currentTab} index={0}>
                <PanelResumenMMPP />
            </TabPanelResumen>

            <TabPanelResumen value={currentTab} index={1}>
                <PanelResumenOrdenes />
            </TabPanelResumen>

            <TabPanelResumen value={currentTab} index={2}>
                <PanelResumenProductos />
            </TabPanelResumen>
        </Box>
    )
}

export default Resumen