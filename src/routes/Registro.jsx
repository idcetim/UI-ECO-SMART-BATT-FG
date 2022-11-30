import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Entradas from './Entradas'
import Produccion from './Produccion';

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

const Registro = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs
                    value={value} onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Registrar Materias primas" {...a11yProps(0)} />
                    <Tab label="Registrar producto" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Entradas />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Produccion />
            </TabPanel>
        </Box>
    );
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default Registro