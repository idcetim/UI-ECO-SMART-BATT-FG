import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Resumen } from '../components/GestionStock/Resumen'
import { StockTabsMenu } from '../components/GestionStock/StockTabsMenu'
import { TabPanel } from '../components/TabPanel'
import { GestionStockMP } from '../components/GestionStock/GestionStockMP'

const GestionStock = () => {
    const [currentTab, setCurrentTab] = useState(0)
    return (
        <Box sx={{ width: '100%' }}>
        <StockTabsMenu currentTab= {currentTab} setCurrentTab={setCurrentTab} />

            <TabPanel value={currentTab} index={0}>
                <GestionStockMP />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
                <GestionStockMP />
            </TabPanel>

            <TabPanel value={currentTab} index={2}>
                <Resumen />
            </TabPanel>
        </Box>
    )
    }
export default GestionStock