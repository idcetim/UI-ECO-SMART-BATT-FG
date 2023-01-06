import { useState, useEffect } from 'react'
import { getObjIdToTamaño } from '../../helpers/api'
import { productosEndpoints } from '../../api/endpoints'
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PieProductos from './PieProductos';
import { Loading } from '../Loading';

const getDatos = (productos, tamaños) => {
    let data = {}
    let totales = {
        cantidad: 0,
        disponibilidad: 0
    }

    if (productos) {
        for (let producto of productos) {
            if (data[producto.tamañoId]) {
                data[producto.tamañoId].cantidad += producto.cantidad
                data[producto.tamañoId].disponibilidad += producto.disponibilidad
            }
            else {
                data[producto.calidadId] = {
                    cantidad: producto.cantidad,
                    disponibilidad: producto.disponibilidad
                }
            }

            totales.cantidad += producto.cantidad
            totales.disponibilidad += producto.disponibilidad
        }
    }

    let totalesYFilas = {
        filas: [],
        totales: totales
    }

    for (let tamaño of Object.keys(data)) {
        totalesYFilas.filas.push({
            tamaño: tamaños[tamaño],
            cantidad: data[tamaño].cantidad,
            disponibilidad: data[tamaño].disponibilidad
        })
    }

    return totalesYFilas
}

const PanelResumenProductos = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const callback = async () => {
            let getTamañosPromise = getObjIdToTamaño()
            let getProductosPromise = fetch(productosEndpoints.getProductos)

            let tamaños = await getTamañosPromise
            let productos = (await (await getProductosPromise).json())

            setData(getDatos(productos, tamaños))
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
                                        <TableCell>Tamaño</TableCell>
                                        <TableCell align="right">Cantidad (kg)</TableCell>
                                        <TableCell align="right">Disponible (kg)</TableCell>
                                        <TableCell align="right">Disponible %</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {data.filas ? data.filas
                                        .concat([{
                                            tamaño: "Total",
                                            cantidad: data.totales.cantidad,
                                            disponibilidad: data.totales.disponibilidad
                                        }])
                                        .map((row) => (
                                            <TableRow
                                                key={row.tamaño}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.tamaño}
                                                </TableCell>
                                                <TableCell align="right">{row.cantidad}</TableCell>
                                                <TableCell align="right">{row.disponibilidad}</TableCell>
                                                <TableCell align="right">{parseFloat(Number(row.disponibilidad / row.cantidad * 100).toFixed(2))}</TableCell>
                                            </TableRow>
                                        )) : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{ maxWidth: '90%', width: '500px', marginLeft: { sm: '20px' }, marginTop: { xs: '20px', sm: 0 } }}>
                        <PieProductos data={data.filas} />
                    </Box>
                </ Box>
            }
        </>
    )
}

export default PanelResumenProductos