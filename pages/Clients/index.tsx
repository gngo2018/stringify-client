import { useRouter } from 'next/router'
import Image from 'next/legacy/image'
import Link from 'next/link'
import useFetch from '../../hooks/useFetch'
import { Client } from '../../models/Clients/Client'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import LoadingSpinner from '../../components/Modules/LoadingSpinner'
import clientStyles from './client.module.css'

export default function Clients() {
    const url = process.env.NEXT_PUBLIC_STRINGIFY_DOTNET_API_URL + 'clients'
    const router = useRouter();
    const clientFetch = useFetch<Client[]>(url);

    const handleButtonOnClick = () => {
        router.push('/Clients/Create')
    }

    return (
        <main className={clientStyles.container}>
            <HeaderContainer name="Client" handleButtonClick={handleButtonOnClick} />
            <div className={clientStyles.client_container}>
                {clientFetch.isLoading && (
                    <LoadingSpinner />
                )}
                {
                    clientFetch.data &&
                    clientFetch.data.map((c) => {
                        return (
                            <Link href={'/Clients/' + c.id} key={c.id} className={clientStyles.client_card}>
                                <div className={clientStyles.card_image}>
                                    <Image
                                        src='/assets/UserIcon.png'
                                        layout='fill'
                                        alt='user-icon'
                                    />
                                </div>
                                <span className={clientStyles.client_details}>{c.firstName} {c.lastName}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </main>
    )
}