import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import { Racket } from '../../models/Rackets/Racket'
import { GetAllRacketsAsync } from '../../services/RacketService'
import racketStyles from './racket.module.css'

export default function Rackets() {
    const router = useRouter();
    const [rackets, setRackets] = useState<Racket[]>([]);

    const handleCreateButtonClick = () => {
        router.push('/Rackets/Create')
    }

    useEffect(() => {
        async function GetAllRackets() {
            const response = await GetAllRacketsAsync();
            if (response.status === 200) {
                setRackets(response.data);
            }
        }
        GetAllRackets();
    }, []);

    return (
        <main className={racketStyles.container}>
            <HeaderContainer name="Racket" handleButtonClick={handleCreateButtonClick} />
            <div className={racketStyles.table}>
                <div className={racketStyles.table_header}>
                    <h4>Brand</h4>
                    <h4>Model</h4>
                    <h4>Year</h4>
                </div>
                {rackets && (
                    rackets.map(r => {
                        return (
                            <Link href={'/Rackets/Detail/' + r.id} key={r.id} className={racketStyles.table_row}>
                                <span>{r.brand}</span>
                                <span>{r.model}</span>
                                <span>{r.year}</span>
                            </Link>
                        )
                    })
                )}
            </div>
        </main>
    )
}