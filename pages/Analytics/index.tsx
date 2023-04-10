import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import RacketBrandChart from '../../components/Analytics/RacketBrandChart'
import RevenuePerMonthChart from '../../components/Analytics/RevenuePerMonthChart'
import { useAuthContext } from '../../contexts/AuthContext'
import { AnalyticsDTO, GetAnalyticsDataAsync } from '../../services/AnalyticsService'
import analyticsStyles from './analytics.module.css'

export default function Analytics() {
    const { isAdmin } = useAuthContext();
    const router = useRouter();
    const startYear = new Date().getFullYear();
    const [startDate, setStartDate] = useState(`${startYear}-01-01`)
    const [endDate, setEndDate] = useState(`${startYear + 1}-01-01`)

    const { data } = useQuery('analyticsData', async () => {
        const res = await GetAnalyticsDataAsync();
        if (res.status === 200) {
            return res.data as AnalyticsDTO[];
        }
    });

    const handleDateOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;
        if (targetName === 'start-date') {
            setStartDate(e.target.value);
        } else if (targetName === 'end-date') {
            setEndDate(e.target.value);
        }
    }

    useEffect(() => {
        if (!isAdmin) {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main>
            {isAdmin && (
                <>
                    <div className={analyticsStyles.date_range_flex_container}>
                        <div className={analyticsStyles.date_range_flex_item}>
                            <label>From</label>
                            <input name='start-date' type="date" value={startDate} onChange={(e) => handleDateOnChange(e)} />
                        </div>
                        <div className={analyticsStyles.date_range_flex_item}>
                            <label>To</label>
                            <input name='end-date' type="date" value={endDate} onChange={(e) => handleDateOnChange(e)} />
                        </div>
                    </div>
                    {data && (
                        <div className={analyticsStyles.container}>
                            <div className={analyticsStyles.container_flex_item}>
                                <h2>Revenue Per Month</h2>
                                <RevenuePerMonthChart analyticsData={data} />
                            </div>
                            <div className={analyticsStyles.container_flex_item}>
                                <h2>Popular Racket Brands</h2>
                                <RacketBrandChart analyticsData={data} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    )
}