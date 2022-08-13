import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetch<T>(url: string) {
    const [data, setData] = useState<T>()
    const [error, setError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function FetchData() {
            try {
                setIsLoading(true)
                const response = await axios.get(url)
                setData(response.data)
            } catch (err) {
                setError('Unable to fetch data');
            } finally {
                setIsLoading(false)
            }
        }

        FetchData();
    }, [url])

    return { data, error, isLoading }
}