import axios from 'axios'
import { StringJob } from '../models/StringJobs/StringJob'

const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'stringjobs';
export async function GetStringJobsByClientIdAsync(clientId: number){
    
    const response = await axios.get<StringJob[]>(`${url}/client/${clientId}`);
    return response;
}