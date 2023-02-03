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

export default function RevenuePerMonthChart({ analyticsData }: { analyticsData: AnalyticsDTO[] }) {
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

    const monthlyRevenue = [];

    //For loop to map the correct month number value
    for (let i = 0; i < 13; i++) {
        const monthData = analyticsData.filter(d => new Date(d.jobDateTime).getMonth() === i)
        if(monthData.length > 0){
            const totalMonthlyAmount = monthData.reduceRight((accumulator, obj) => {
                return accumulator + obj.chargeAmount;
            }, 0)
            monthlyRevenue.push(totalMonthlyAmount);
        } else {
            monthlyRevenue.push(0);
        }
    }

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: monthlyRevenue,
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