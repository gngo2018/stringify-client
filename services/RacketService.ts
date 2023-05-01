import axios from 'axios'

const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'rackets'

export interface RacketProps {
    brand: string,
    model: string,
    year: number,
    serialNumber?: string
}

export function GetStaticRacketBrands() {
    let brands = [
        { id: 1, name: 'Babolat' },
        { id: 2, name: 'Wilson' },
        { id: 3, name: 'Head' },
        { id: 4, name: 'Yonex' },
        { id: 5, name: 'Technifibre' },
        { id: 6, name: 'Diadem' },
        { id: 7, name: 'Prince' },
        { id: 8, name: 'Dunlop' },
        { id: 9, name: 'Vokl' },
        { id: 10, name: 'ProKennex' },
        { id: 11, name: 'Solinco' },
        { id: 12, name: 'Gamma' },
        { id: 13, name: 'Lacoste' }
    ]

    return brands;
}

export async function GetAllRacketsAsync() {
    const response = await axios.get(url);
    return response;
}

export async function CreateRacketAsync(racket: RacketProps) {
    const response = await axios.post(url, racket);
    return response;
}

export async function GetRacketByIdAsync(id: number) {
    const response = await axios.get(url + `/${id}`);
    return response;
}