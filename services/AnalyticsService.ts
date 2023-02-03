import axios from 'axios'
const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'analytics';

export type AnalyticsDTO = {
    brand: string,
    chargeAmount: number,
    jobDateTime: Date
}

export async function GetAnalyticsDataAsync() {
    const response = await axios.get(url);
    return response;
}