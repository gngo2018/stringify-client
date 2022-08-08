import axios from 'axios'
import { RacketFormProps } from '../components/Rackets/Form';
import { Racket } from '../models/Rackets/Racket'

const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'rackets'

export function GetStaticRacketBrands() {
    let brands = [
        { id: 1, name: 'Babolat' },
        { id: 2, name: 'Wilson' },
        { id: 3, name: 'Head' },
        { id: 4, name: 'Yonex' },
        { id: 5, name: 'Technifibre' },
        { id: 6, name: 'Diadem' }
    ]

    return brands;
}

export async function GetAllRacketsAsync() {
    const response = await axios.get(url);
    return response;
}

export async function CreateRacketAsync(racket: RacketFormProps) {
    const response = await axios.post(url, racket);
    return response;
}

export async function GetRacketByIdAsync(id: number) {
    const response = await axios.get(url + `/${id}`);
    return response;
}