import React from 'react'
import { Box, Tabs, Tab } from '@mui/material'

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TiposTabsMenu = ({ currentTab, setCurrentTab }) => {

  const tabChanged = (event, newValue) => { setCurrentTab(newValue) }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={currentTab}
        onChange={tabChanged}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="Calidades" {...a11yProps(0)} />
        <Tab label="Tamaños" {...a11yProps(1)} />
        <Tab label="Procesos" {...a11yProps(2)} />
        <Tab label="Ubicaciones" {...a11yProps(3)} />
        <Tab label="Origenes" {...a11yProps(4)} />
      </Tabs>
    </Box>
  )
}