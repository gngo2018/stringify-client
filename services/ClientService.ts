import { Client } from '../models/Client'

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
    console.log(requestURL);
    
    const response = await fetch(requestURL);
    const client = await response.json();
    if(client){
        return client as Client
    }
    else{
        return {} as Client
    }
}