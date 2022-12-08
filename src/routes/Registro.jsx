import { useState } from 'react'
import { Box } from '@mui/material'
import Entradas from '../components/Registro/Entradas'
import Produccion from '../components/Registro/Produccion'
import { OrdenesTrabajo } from '../components/Registro/OrdenesTrabajo'
import { TabPanel } from '../components/TabPanel'
import { RegistroTabsMenu } from '../components/Registro/RegistroTabsMenu'

const Registro = () => {
    const [currenteTab, setCurrentTab] = useState(0)
    return (
        <Box sx={{ width: '100%' }}>
            <RegistroTabsMenu currentTab={currenteTab} setCurrentTab={setCurrentTab} />

            <TabPanel value={currenteTab} index={0}>
                <Entradas />
            </TabPanel>

            <TabPanel value={currenteTab} index={1}>
                <OrdenesTrabajo />
            </TabPanel>

            <TabPanel value={currenteTab} index={2}>
                <Produccion />
            </TabPanel>
        </Box>
    );
}


export default Registro