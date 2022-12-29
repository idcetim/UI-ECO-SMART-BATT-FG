import React, { useState } from 'react'
import { Box } from '@mui/system'
import { TabPanel } from '../components/TabPanel'
import { TiposTabsMenu } from '../components/EditarTipos/TiposTabsMenu'
import { EditarCalidades } from '../components/EditarTipos/EditarCalidades'
import { EditarTamaños } from '../components/EditarTipos/EditarTamaños'
import { EditarProcesos } from '../components/EditarTipos/EditarProcesos'
import { EditarOrigenes } from '../components/EditarTipos/EditarOrígenes'
import { EditarUbicaciones } from '../components/EditarTipos/EditarUbicaciones'

const EditarTipos = () => {
    const [currentTab, setCurrentTab] = useState(0)
    return (
        <Box sx={{ width: '100%' }}>
            <TiposTabsMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <TabPanel value={currentTab} index={0}>
                <EditarCalidades />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
                <EditarTamaños />
            </TabPanel>

            <TabPanel value={currentTab} index={2}>
                <EditarProcesos />
            </TabPanel>

            <TabPanel value={currentTab} index={3}>
                <EditarUbicaciones />
            </TabPanel>

            <TabPanel value={currentTab} index={4}>
                <EditarOrigenes />
            </TabPanel>
        </Box>
    )
}

export default EditarTipos

