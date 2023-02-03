import RacketBrandChart from '../../components/Analytics/RacketBrandChart'
import RevenuePerMonthChart from '../../components/Analytics/RevenuePerMonthChart'
import analyticsStyles from './analytics.module.css'

export default function Analytics() {
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
                    <h2>Revenue per month</h2>
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