import React from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement
    
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { GetStaticRacketBrands } from '../../services/RacketService'

export default function RacketBrandChart() {
    ChartJs.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );
    const racketBrands = GetStaticRacketBrands();
    let racketBrandNames: string[] = [];
    let racketMetrics: number[] = [];

    racketBrands.map(r =>{
        racketBrandNames.push(r.name);
        //TODO: Add logic to get all racket brands from string jobs and map to racketMetrics array
    });

    const chartData = {
        labels: racketBrandNames,
        datasets: [
            {
                data: [10, 6, 30, 40, 5, 60, 70, 8, 90, 10, 110, 120],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {

        },
    }


    return (
        <Bar
            data={chartData}
            options={options}
        />
    );
}