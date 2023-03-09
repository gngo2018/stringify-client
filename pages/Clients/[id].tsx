import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as ClientService from '../../services/ClientService'
import * as StringJobService from '../../services/StringJobService'
import { Client } from '../../models/Clients/Client'
import clientDetailStyles from './client_detail.module.css'
import TabNav from '../../components/Clients/TabNav'
import ClientRacketTable from '../../components/ClientRackets/ClientRacketTable'
import { GetRacketsByClientId } from '../../services/ClientRacketService'
import { ClientDetailFormContext } from '../../contexts/ClientDetailFormContext'
import { Racket } from '../../models/Rackets/Racket'

export default function ClientDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [clientId, setClientId] = useState(0);
    const [client, setClient] = useState<Client>();
    const [userRole, setUserRole] = useState('guest');
    const [historyIsActive, setHistoryIsActive] = useState(true);
    const [racketsIsActive, setRacketsIsActive] = useState(false);
    const [futureJobsIsActive, setFutureJobsIsActive] = useState(false);
    const [infoIsActive, setInfoIsActive] = useState(false);
    const [racketDefault, setRacketDefault] = useState({
        id: 0,
        brand: '',
        model: '',
        year: 0
    });

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

    const handleActivePanelOnChange = (panelName: string) => {
        setHistoryIsActive(false);
        setRacketsIsActive(false);
        setFutureJobsIsActive(false);
        setInfoIsActive(false);

        if (panelName.toUpperCase() === 'HISTORY') {
            setHistoryIsActive(true);
        }
        else if (panelName.toUpperCase() === 'RACKETS') {
            setRacketsIsActive(true);
        }
        else if (panelName.toUpperCase() === 'FUTUREJOBS') {
            setFutureJobsIsActive(true);
        }
        else if (panelName.toUpperCase() === 'INFO') {
            setInfoIsActive(true);
        }
    }

    useEffect(() => {
        async function GetClientById() {
            if (id) {
                const clientId = parseInt(id.toString());
                setClientId(clientId);
                const response = await ClientService.GetClientById(clientId);
                const stringJobs = await GetStringJobsByClientId(clientId);
                const clientRacketResponse = await GetRacketsByClientId(clientId);
                if (clientRacketResponse.status === 200) {
                    response.clientRackets = clientRacketResponse.data;
                }
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
        <ClientDetailFormContext.Provider value={{clientId: clientId, racket: racketDefault, setRacket: setRacketDefault}}>
            <div className={clientDetailStyles.container}>
                <h2>{client?.firstName} {client?.lastName}</h2>
                <article className={clientDetailStyles.main_content_container}>
                    {historyIsActive && (
                        <section className={clientDetailStyles.string_job_history_container}>
                            {client?.stringJobs && (
                                client.stringJobs.map(sj => {
                                    return (
                                        <Link href={'/StringJobs/Detail/' + sj.id} key={sj.id} className={clientDetailStyles.string_job_link}>
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
                        </section>
                    )}
                    {racketsIsActive && client?.clientRackets && (
                        <ClientRacketTable clientRackets={client.clientRackets} />
                    )}
                    {futureJobsIsActive && (
                        <></>
                    )}
                    {infoIsActive && (
                        <>
                            <div className={clientDetailStyles.client_detail_container}>
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
                        </>
                    )}
                </article>
                <TabNav setActivePanel={(panelName) => handleActivePanelOnChange(panelName)} />
            </div>
        </ClientDetailFormContext.Provider>
    )
}