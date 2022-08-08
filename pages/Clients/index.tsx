import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import { Client } from '../../models/Clients/Client'
import * as ClientService from '../../services/ClientService'
import clientStyles from './client.module.css'

export default function Clients() {
    const router = useRouter();
    const [clients, setClients] = useState<Client[]>();

    const handleButtonOnClick = () => {
        router.push('/Clients/Create')
    }

    useEffect(() => {
        async function GetAllClients() {
            const clients = await ClientService.GetAllClientsAsync();
            setClients(clients);
        }

        GetAllClients();
    }, []);

    return (
        <main className={clientStyles.container}>
        <HeaderContainer name="Client" handleButtonClick={handleButtonOnClick} />
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