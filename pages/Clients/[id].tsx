import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as ClientService from '../../services/ClientService'
import { Client } from '../../models/Clients/Client'
import clientDetailStyles from './client_detail.module.css'

export default function ClientDetail(){
    const router = useRouter();
    const {id} = router.query;
    const [client, setClient] = useState<Client>();

    useEffect(() => {
        async function GetClientById(){
            if(id){
                const response = await ClientService.GetClientById(parseInt(id.toString()));
                setClient(response);
            }
        }

        GetClientById();
    }, [id])

    return(
        <>
            <h2>{client?.firstName} {client?.lastName}</h2>
            <p>Racket: {client?.racket}</p>
        </>
    )
}