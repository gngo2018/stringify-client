import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as ClientService from '../../services/ClientService'
import { Client } from '../../models/Clients/Client'
import clientDetailStyles from './client_detail.module.css'

export default function ClientDetail(){
    const router = useRouter();
    const {id} = router.query;
    const [client, setClient] = useState<Client>();

    const handleEdit = () => {
        const clientJson = JSON.stringify(client);
        router.push({
            pathname: '/Clients/Update/[client]',
            query: {client: clientJson}
        })
    }

    const handleDelete = async () => {
        const result = confirm('Are you sure you want to delete this client?')
        if(result === true && id) {
            const clientId = parseInt(id?.toString());
            const response = await ClientService.DeleteClientAsync(clientId);

            if(response.status === 204){
                router.push('/Clients')
            }
        }
    }

    useEffect(() => {
        async function GetClientById(){
            if(id){
                const response = await ClientService.GetClientById(parseInt(id.toString()));
                setClient(response);
                console.log(response);
                
            }
        }

        GetClientById();
    }, [id])

    return(
        <>
            <h2>{client?.firstName} {client?.lastName}</h2>
            <div className={clientDetailStyles.button_container}>
                <button onClick={() => handleEdit()}>Edit</button>
                <button onClick={() => handleDelete()}>Delete</button>
            </div>
            <p>Email: {client?.emailAddress}</p>
            <p>Phone: {client?.phoneNumber}</p>
            <p>Racket: {client?.racket}</p>
        </>
    )
}