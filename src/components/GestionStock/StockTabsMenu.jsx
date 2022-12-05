import React from 'react'
import { Box, Tabs, Tab } from '@mui/material'

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const StockTabsMenu = ({ currentTab, setCurrentTab }) => {

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
        <Tab label="Materias primas" {...a11yProps(0)} />
        <Tab label="Productos" {...a11yProps(0)} />
        <Tab label="Resumen" {...a11yProps(0)} />
      </Tabs>
    </Box>
  )
}