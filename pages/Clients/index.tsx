import { useEffect, useState } from 'react'
import { Client } from '../../services/ClientService'
import * as ClientService from '../../services/ClientService'
import clientStyles from './client.module.css'

export default function Clients() {
    const [clients, setClients] = useState<Client[]>();

    useEffect(() => {
        async function GetAllClients() {
            const clients = await ClientService.GetAllClients();
            setClients(clients);
        }

        GetAllClients();
    }, []);

    return (
        <>
            <h1>Client Page!</h1>
            <div className={clientStyles.client_container}>
                {
                    clients &&
                    clients.map((c) => {
                        return <div className={clientStyles.client_card} key={c.id}>{c.firstName} {c.lastName}</div>
                    })
                }
            </div>
        </>
    )
}