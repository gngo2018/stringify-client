import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Client } from '../../models/Clients/Client'
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
        <main className={clientStyles.container}>
            <div className={clientStyles.header_container}>
                <h2>Client List Page</h2>
                <Link href="/Clients/Create">
                    <button>Create</button>
                </Link>
            </div>
            <div className={clientStyles.client_container}>
                {
                    clients &&
                    clients.map((c) => {
                        return (
                            <Link href={'/Clients/' + c.id} key={c.id}>
                                <div className={clientStyles.client_card}>{c.firstName} {c.lastName}</div>
                            </Link>
                        )
                    })
                }
            </div>
        </main>
    )
}