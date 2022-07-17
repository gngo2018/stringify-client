import axios from 'axios'
import { StringJob } from '../models/StringJobs/StringJob'
import { StringJobForm } from '../models/StringJobs/StringJobForm'

const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'stringjobs';

export async function GetAllStringJobsAsync(){
    const response = await axios.get<StringJob[]>(url);
    return response;
}

export async function GetStringJobById(id: number){
    const response = await axios.get(url + `/${id}`);
    return response;
}

export async function GetStringJobsByClientIdAsync(clientId: number){
    const response = await axios.get<StringJob[]>(`${url}/client/${clientId}`);
    return response;
}

export async function CreateStringJobAsync(payload: StringJobForm) {
    const response = await axios.post(url, payload);
    return response;
}

export async function UpdateStringJobAsync(id: number, payload: StringJobForm) {
    const response = await axios.put(`${url}/${id}`, payload);
    return response;
}

export async function DeleteStringJobAsync(id: number){
    const response = await axios.delete(url + `/${id}`);
    return response;
}