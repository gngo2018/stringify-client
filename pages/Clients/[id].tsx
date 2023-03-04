import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as ClientService from '../../services/ClientService'
import * as StringJobService from '../../services/StringJobService'
import { Client } from '../../models/Clients/Client'
import clientDetailStyles from './client_detail.module.css'
import Link from 'next/link'

export default function ClientDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [client, setClient] = useState<Client>();
    const [userRole, setUserRole] = useState('guest');

    const handleEdit = () => {
        const clientJson = JSON.stringify(client);
        router.push({
            pathname: '/Clients/Update/[client]',
            query: { client: clientJson }
        })
    }

    const handleDelete = async () => {
        const result = confirm('Are you sure you want to delete this client?')
        if (result === true && id) {
            const clientId = parseInt(id?.toString());
            const response = await ClientService.DeleteClientAsync(clientId);

            if (response.status === 204) {
                router.push('/Clients')
            }
        }
    }

    useEffect(() => {
        async function GetClientById() {
            if (id) {
                const clientId = parseInt(id.toString());
                const response = await ClientService.GetClientById(clientId);
                const stringJobs = await GetStringJobsByClientId(clientId);
                stringJobs?.sort((a, b) => +new Date(b.jobDateTimeUtc) - +new Date(a.jobDateTimeUtc));
                response.stringJobs = stringJobs;
                setClient(response);

                const userRole = localStorage.getItem('userRole');
                if (userRole) {
                    setUserRole(userRole);
                }
            }
        }

        async function GetStringJobsByClientId(id: number) {
            const response = await StringJobService.GetStringJobsByClientIdAsync(id);
            if (response.status === 200) {
                return response.data;
            }
        }

        GetClientById();
    }, [id])

    return (
        <div className={clientDetailStyles.container}>
            <div className={clientDetailStyles.client_detail_container}>
                <h2>{client?.firstName} {client?.lastName}</h2>
                {userRole === 'admin' && (
                    <>
                        <p>Email: {client?.emailAddress}</p>
                        <p>Phone: {client?.phoneNumber}</p>
                    </>
                )}
                <p>Preferred Racket: {client?.racket}</p>
            </div>
            {userRole === 'admin' && (
                <div className={clientDetailStyles.button_container}>
                    <button onClick={() => handleEdit()}>Edit</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
            )}
            <div className={clientDetailStyles.string_job_header_container}>
                <h3>Stringing History</h3>
                {/* <button>New Job</button> */}
            </div>
            {client?.stringJobs && (
                client.stringJobs.map(sj => {
                    return (
                        <Link legacyBehavior href={'/StringJobs/Detail/' + sj.id} key={sj.id}>
                            <div className={clientDetailStyles.string_job_card}>
                                <span>Date: {sj.jobDateTimeUtc.toString()}</span>
                                <span>Racket: {sj.racket}</span>
                                <span>String: {sj.stringName}</span>
                                <span>String Type: {sj.stringType}</span>
                                <span>Tension: {sj.tension} {sj.tensionType}</span>
                            </div>
                        </Link>
                    )
                })
            )}
        </div>
    )
}