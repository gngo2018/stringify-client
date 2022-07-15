import axios from 'axios'
import { Client } from '../models/Clients/Client'
import { ClientCreate } from '../models/Clients/ClientCreate'

const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'clients';

export async function GetAllClients() {
    let clientArray: Client[] = [];
    const response = await fetch(url);
    const clients = await response.json();
    if (clients) {
        clientArray = clients as Client[];
    }

    return clientArray;
}

export async function GetClientById(id: number) {
    const requestURL = url + '/' + id
    const response = await fetch(requestURL);
    const client = await response.json();
    if(client){
        return client as Client
    }
    else{
        return {} as Client
    }
}

export async function CreateClientAsync(client: ClientCreate){
    const response = await axios.post(url, client)

    return response;
}