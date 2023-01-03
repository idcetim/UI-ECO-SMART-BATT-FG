import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const getDataFormateada = (data) => ({
    labels: data
        .filter(fila => fila.disponibilidad > 0)
        .map(fila => fila.tamaño)
    ,
    datasets: [
        {
            label: 'Disponibilidad (kg)',
            data: data
                .filter(fila => fila.disponibilidad > 0)
                .map(fila => fila.disponibilidad),
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

const PieProductos = (props) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Pie data={
                getDataFormateada(props.data ?? [])
            } />

            <Typography variant="subtitle2" sx={{ marginTop: '20px' }}>Distribución de los productos disponibles en base a su tamaño</Typography>
        </div>
    )
}

export default PieProductos
