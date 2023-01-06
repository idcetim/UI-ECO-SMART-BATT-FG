import { useState, useEffect } from 'react'
import { ordenesTrabajoEndpoints } from '../../api/endpoints'
import { getObjIdToProceso } from '../../helpers/api'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Loading } from '../Loading';

const getDatos = (ordenes, procesos) => {
    if (ordenes) {
        let ordenesOrdenadas = ordenes.sort((a, b) => {
            if ((new Date(a.fecha)) > (new Date(b.fecha))) {
                return 1
            }

            if ((new Date(a.fecha)) < (new Date(b.fecha))) {
                return -1
            }

            return 0
        })

        return ordenesOrdenadas.filter(element => element.cantidadProductos > 0).slice(0, 10)
    }

    return null
}

const PanelResumenOrdenes = () => {
    const [data, setData] = useState(null)
    const [procesos, setProcesos] = useState({})

    useEffect(() => {
        const callback = async () => {
            let getProcesosPromise = getObjIdToProceso()
            let getOrdenesPromise = fetch(ordenesTrabajoEndpoints.getOrdenesTrabajo)

            let procesos = await getProcesosPromise
            let ordenes = (await (await getOrdenesPromise).json())

            setProcesos(procesos)
            setData(getDatos(ordenes, procesos))
        }

        callback()
    }, [])

    return (
        <>
            {data === null && <Loading text={"Cargando"} />}
            {data !== null &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '20px' }}>
                    <h3 style={{ marginBottom: '30px' }}>Ultimos 10 procesos con pérdidas:</h3>

                    <TableContainer component={Paper} sx={{ width: '500px', maxWidth: '90%', height: 'fit-content' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell align="right">Procesos</TableCell>
                                    <TableCell align="right">Pérdidas (kg)</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data ? data
                                    .map((row) => (
                                        <TableRow
                                            key={row.codigo}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.codigo}
                                            </TableCell>

                                            <TableCell align="right">{row.procesosIds.map(element => {
                                                return procesos[element]
                                            }).join(', ')}
                                            </TableCell>

                                            <TableCell align="right">{row.perdidasODisponible}</TableCell>
                                        </TableRow>
                                    )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ div>
            }
        </>
    )
}

export default PanelResumenOrdenes