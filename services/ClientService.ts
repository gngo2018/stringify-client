const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'clients';

export type Client = {
    id: number
    firstName: string
    lastName: string
    racket: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export async function GetAllClients() {
    let clientArray: Client[] = [];
    const response = await fetch(url);
    const clients = await response.json();
    if(clients){
        clientArray = clients as Client[];
    } 

    return clientArray;
}