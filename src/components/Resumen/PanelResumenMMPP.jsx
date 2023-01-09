import { useState, useEffect } from 'react'
import { getObjIdToCalidad } from '../../helpers/api'
import { mmppEndpoints } from '../../api/endpoints'
import { Box } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PieMMPP from './PieMMPP';
import { Loading } from '../Loading';

const getDatos = (materiasPrimas, calidades) => {
    let data = {}
    let totales = {
        cantidad: 0,
        disponibilidad: 0
    }

    if (materiasPrimas) {
        for (let materiaPrima of materiasPrimas) {
            if (data[materiaPrima.calidadId]) {
                data[materiaPrima.calidadId].cantidad += materiaPrima.cantidad
                data[materiaPrima.calidadId].disponibilidad += materiaPrima.disponibilidad
            }
            else {
                data[materiaPrima.calidadId] = {
                    cantidad: materiaPrima.cantidad,
                    disponibilidad: materiaPrima.disponibilidad
                }
            }

            totales.cantidad += materiaPrima.cantidad
            totales.disponibilidad += materiaPrima.disponibilidad
        }
    }

    let totalesYFilas = {
        filas: [],
        totales: totales
    }

    for (let calidad of Object.keys(data)) {
        totalesYFilas.filas.push({
            calidad: calidades[calidad],
            cantidad: data[calidad].cantidad,
            disponibilidad: data[calidad].disponibilidad
        })
    }

    return totalesYFilas
}

const PanelResumenMMPP = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const callback = async () => {
            let getCalidadesPromise = getObjIdToCalidad()
            let getMMPPPromise = fetch(mmppEndpoints.getMMPP)

            let calidades = await getCalidadesPromise
            let mmpp = (await (await getMMPPPromise).json())

            setData(getDatos(mmpp, calidades))
        }

        callback()
    }, [])

    return (
        <>
            {data === null && <Loading text={"Cargando"} />}
            {data !== null &&
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, marginTop: '20px' }}>
            <Box sx={{ width: '500px', maxWidth: '90%' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Calidad</TableCell>
                                <TableCell align="right">Cantidad (kg)</TableCell>
                                <TableCell align="right">Disponibilidad (kg)</TableCell>
                                <TableCell align="right">Disponible %</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.filas ? data.filas
                                .concat([{
                                    calidad: "Total",
                                    cantidad: data.totales.cantidad,
                                    disponibilidad: data.totales.disponibilidad
                                }])
                                .map((row) => (
                                    <TableRow
                                        key={row.calidad}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.calidad}
                                        </TableCell>
                                        <TableCell align="right">{parseFloat(Number(row.cantidad).toFixed(2))}</TableCell>
                                        <TableCell align="right">{parseFloat(Number(row.disponibilidad).toFixed(2))}</TableCell>
                                        <TableCell align="right">{parseFloat(Number(row.disponibilidad / row.cantidad * 100).toFixed(2))}</TableCell>
                                    </TableRow>
                                )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box sx={{ maxWidth: '90%', width: '500px', marginLeft: { sm: '20px' }, marginTop: { xs: '20px', sm: 0 } }}>
                {data.totales && data.totales.disponibilidad ? <PieMMPP data={data} /> : null}
            </Box>
        </ Box>
}
        </>
    )
}

export default PanelResumenMMPP