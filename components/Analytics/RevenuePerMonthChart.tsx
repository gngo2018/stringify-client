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
    Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import revenueStyles from './revenue.module.css'
import { AnalyticsDTO } from '../../services/AnalyticsService';

export default function RevenuePerMonthChart({analyticsData}: {analyticsData: AnalyticsDTO[]}) {
    ChartJs.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            line: {
                tension: 0,
                borderWidth: 2,
                borderColor: '#11888F',
                fill: 'start',
            },
            point: {
                backgroundColor: 'gray'
            },
        },
    }

    return (
        <Line
            data={chartData}
            options={options}
        />
    );
}