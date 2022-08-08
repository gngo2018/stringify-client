import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import { Client } from '../../models/Clients/Client'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import { GetAllClientsAsync } from '../../services/ClientService'
import { GetAllClientRacketsAsync } from '../../services/ClientRacketService'
import clientRacketStyles from './client_racket.module.css'

export default function ClientRackets() {
    const router = useRouter();
    const [clients, setClients] = useState<Client[]>()
    const [clientRackets, setClientRackets] = useState<ClientRacket[]>();
    const [clientRacketsByClient, setClientRacketsByClient] = useState<ClientRacket[]>();

    const handleButtonOnClick = () => {
        router.push('/ClientRackets/Create')
    }

    const handleSelectOnChange = (clientId: string) => {
        const inMemoryClientRackets = clientRackets;
        if(clientId !== ''){
            const id = parseInt(clientId);
            const filteredClients = inMemoryClientRackets?.filter(cr => cr.clientId === id);
            setClientRacketsByClient(filteredClients);
        }
        else{
            setClientRacketsByClient([]);
        }
    }

    useEffect(() => {
        async function GetAllClients() {
            const clients = await GetAllClientsAsync();
            if(clients){
                setClients(clients)
            }
        }

        async function GetAllClientRackets() {
            const response = await GetAllClientRacketsAsync();
            if (response.status === 200) {
                setClientRackets(response.data);
            }
        }

        GetAllClients();
        GetAllClientRackets();
    }, []);
    
    return (
        <main className={clientRacketStyles.container}>
            <HeaderContainer name="Client Racket" handleButtonClick={handleButtonOnClick} />
            <div className={clientRacketStyles.client_select_container}>
                <select onChange={(e) => handleSelectOnChange(e.target.value)}>
                    <option value=''></option>
                    {clients && (
                        clients.map((c) => {
                            return <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                        })
                    )}
                </select>
            </div>
            <div className={clientRacketStyles.table}>
                <div className={clientRacketStyles.table_header}>
                    <h4>Serial Number</h4>
                    <h4>First Name</h4>
                    <h4>Last Name</h4>
                    <h4>Racket</h4>
                </div>
                {clientRackets && clientRacketsByClient && (
                    clientRacketsByClient.map(cr => {
                        return (
                            <Link href={'/ClientRackets/Detail/' + cr.clientRacketId} key={cr.clientRacketId}>
                                <div className={clientRacketStyles.table_row}>
                                    <span>{cr.serialNumber}</span>
                                    <span>{cr.clientFirstName}</span>
                                    <span>{cr.clientLastName}</span>
                                    <span>{cr.racketBrand} {cr.racketModel} {cr.racketYear}</span>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </main>
    )
}