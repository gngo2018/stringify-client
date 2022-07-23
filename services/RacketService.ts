import axios from 'axios'
import { Racket } from '../models/Rackets/Racket'

const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'rackets'

export async function GetAllRacketsAsync(){
    const response = await axios.get(url);
    return response;
}