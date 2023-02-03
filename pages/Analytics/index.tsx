import { useEffect } from 'react'
import RacketBrandChart from '../../components/Analytics/RacketBrandChart'
import RevenuePerMonthChart from '../../components/Analytics/RevenuePerMonthChart'
import { GetAnalyticsDataAsync } from '../../services/AnalyticsService'
import analyticsStyles from './analytics.module.css'

export default function Analytics() {
    // useEffect(() => {
    //     async function GetAnalyticsData() {
    //         const res = await GetAnalyticsDataAsync();
    //         if(res.status === 200){
    //             console.log(res.data);
    //         }
    //     }
    //     GetAnalyticsData();
    // }, []);

    return (
        <main>
            <div className={analyticsStyles.date_range_flex_container}>
                <div className={analyticsStyles.date_range_flex_item}>
                    <label>From</label>
                    <input type="date" />
                </div>
                <div className={analyticsStyles.date_range_flex_item}>
                    <label>To</label>
                    <input type="date" />
                </div>
            </div>
            <div className={analyticsStyles.container}>
                <div className={analyticsStyles.container_flex_item}>
                    <h2>Revenue Per Month</h2>
                    <RevenuePerMonthChart />
                </div>
                <div className={analyticsStyles.container_flex_item}>
                    <h2>Popular Racket Brands</h2>
                    <RacketBrandChart />
                </div>
            </div>
        </main>
    )
}