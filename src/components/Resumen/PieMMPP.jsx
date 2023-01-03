import React from 'react';
import { Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const getDataFormateada = (data, disponibilidad) => {
    console.log(data)

    return ({
        labels: data
            .filter(fila => fila.disponibilidad > 0)
            .map(fila => fila.calidad)
        ,
        datasets: [
            {
                label: 'Disponibilidad %',
                data: data
                    .filter(fila => fila.disponibilidad > 0)
                    .map(fila => parseFloat(Number((fila.disponibilidad / disponibilidad * 100).toFixed(2)))),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ]
    })
}


const PieMMPP = (props) => {
    console.log(props)

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Pie data={
                getDataFormateada(props.data.filas ?? [], props.data.totales.disponibilidad)
            } />

            <Typography variant="subtitle2" sx={{marginTop: '20px'}}>Distribución de las materias primas disponibles en base a su calidad</Typography>
        </div>
    )
}

export default PieMMPP
