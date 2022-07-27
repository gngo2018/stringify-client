import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import { GetAllClientRacketsAsync } from '../../services/ClientRacketService'
import clientRacketStyles from './client_racket.module.css'

export default function ClientRackets() {
    const router = useRouter();
    const [clientRackets, setClientRackets] = useState<ClientRacket[]>();
    const handleButtonOnClick = () => {
        router.push('/ClientRackets/Create')
    }

    useEffect(() => {
        async function GetAllClientRackets() {
            const response = await GetAllClientRacketsAsync();
            if (response.status === 200) {
                setClientRackets(response.data);
            }
        }
        GetAllClientRackets();
    }, []);
    return (
        <main className={clientRacketStyles.container}>
            <HeaderContainer name="Cient Racket" handleButtonClick={handleButtonOnClick} />
            <div className={clientRacketStyles.table}>
                <div className={clientRacketStyles.table_header}>
                    <h4>Serial Number</h4>
                    <h4>Client</h4>
                    <h4>Racket</h4>
                </div>
                {clientRackets && (
                    clientRackets.map(cl => {
                        return (
                            <Link href={'/ClientRackets/Detail/' + cl.id} key={cl.id}>
                                <div className={clientRacketStyles.table_row}>
                                    <span>{cl.serialNumber}</span>
                                    <span>{cl.clientId}</span>
                                    <span>{cl.racketId}</span>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </main>
    )
}