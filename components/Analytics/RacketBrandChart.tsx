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
import { AnalyticsDTO } from '../../services/AnalyticsService'

export default function RacketBrandChart({analyticsData}: {analyticsData: AnalyticsDTO[]}) {
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
        const racketCount = analyticsData.filter(d => d.brand == r.name).length;
        racketMetrics.push(racketCount);
        
    });

    const chartData = {
        labels: racketBrandNames,
        datasets: [
            {
                data: racketMetrics,
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
            bar: {
                backgroundColor: '#11888F'
            }
        },
    }


    return (
        <Bar
            data={chartData}
            options={options}
        />
    );
}