import axios from 'axios'
const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'clientrackets';

export type ClientRacketFormProps = {
    clientRacketId?: number,
    serialNumber: string,
    clientId: number,
    racketId: number
}

export async function GetAllClientRacketsAsync() {
    const response = await axios.get(url);
    return response;
}

export async function CreateClientRacketAsync(clientRacket: ClientRacketFormProps) {
    const response = await axios.post(url, clientRacket);
    return response;
}

export async function GetRacketsByClientId(id: number){
    const response = await axios.get(url + '/client/' + id);
    return response;
}

export async function UpdateClientRacketAsync(clientRacket: ClientRacketFormProps){
    const response = await axios.put(url + `/${clientRacket.clientRacketId}`, clientRacket);
    return response;
}