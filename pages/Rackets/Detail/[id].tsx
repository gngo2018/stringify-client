import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Racket } from '../../../models/Rackets/Racket'
import detailStyles from './detail.module.css'
import { GetRacketByIdAsync } from '../../../services/RacketService'

export default function RacketDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [racket, setRacket] = useState<Racket>()
    const { isAdmin } = useAuthContext();

    const handleDelete = () => {

    }

    useEffect(() => {
        async function GetRacketById(){
            if(id){
                const response = await GetRacketByIdAsync(parseInt(id.toString()));
                if(response.status === 200){
                    setRacket(response.data);
                }
            }
        }
        GetRacketById();
    }, [id]);

    return(
        <main className={detailStyles.container}>
            <h2>Racket Details</h2>
            {isAdmin && (
                <div className={detailStyles.button_container}>
                    <Link legacyBehavior href={'/Rackets/Update/' + racket?.id}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
            )}
            <label>Brand</label>
            <span>{racket?.brand}</span>
            <label>Model</label>
            <span>{racket?.model}</span>
            <label>Year</label>
            <span>{racket?.year}</span>
        </main>
    );
}