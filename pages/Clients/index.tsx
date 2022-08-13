import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import { Client } from '../../models/Clients/Client'
import clientStyles from './client.module.css'
import useFetch from '../../hooks/useFetch'
const url = process.env.NEXT_PUBLIC_STRINGIFY_API_URL + 'clients'

export default function Clients() {
    const router = useRouter();
    const { data, isLoading, error } = useFetch(url);

    const handleButtonOnClick = () => {
        router.push('/Clients/Create')
    }

    return (
        <main className={clientStyles.container}>
            <HeaderContainer name="Client" handleButtonClick={handleButtonOnClick} />
            <div className={clientStyles.client_container}>
                {isLoading && (
                    <div>Loading...</div>
                )}
                {
                    data &&
                    data.map((c: Client) => {
                        return (
                            <Link href={'/Clients/' + c.id} key={c.id}>
                                <div className={clientStyles.client_card}>
                                    <div className={clientStyles.card_image}>
                                        <Image
                                            src='/assets/UserIcon.png'
                                            layout='fill'
                                        />
                                    </div>
                                    <span className={clientStyles.client_details}>{c.firstName} {c.lastName}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </main>
    )
}