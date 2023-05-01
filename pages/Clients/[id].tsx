import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../contexts/AuthContext'
import * as ClientService from '../../services/ClientService'
import * as StringJobService from '../../services/StringJobService'
import { Client } from '../../models/Clients/Client'
import TabNav from '../../components/Clients/TabNav'
import ClientRacketTable from '../../components/ClientRackets/ClientRacketTable'
import { GetRacketsByClientId } from '../../services/ClientRacketService'
import { ClientDetailContext } from '../../contexts/ClientDetailContext'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import StringJobList from '../../components/StringJobs/StringJobList'
import { StringJob } from '../../models/StringJobs/StringJob'
import clientDetailStyles from './client_detail.module.css'

export default function ClientDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { isAdmin } = useAuthContext();
    const [clientId, setClientId] = useState(0);
    const [client, setClient] = useState<Client>();
    const [pastJobsIsActive, setPastJobsIsActive] = useState(true);
    const [racketsIsActive, setRacketsIsActive] = useState(false);
    const [futureJobsIsActive, setFutureJobsIsActive] = useState(false);
    const [infoIsActive, setInfoIsActive] = useState(false);
    const [clientRackets, setClientRackets] = useState<ClientRacket[]>([]);
    const [stringJobs, setStringJobs] = useState<StringJob[]>([]);

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
        setPastJobsIsActive(false);
        setRacketsIsActive(false);
        setFutureJobsIsActive(false);
        setInfoIsActive(false);

        if (panelName.toUpperCase() === 'PASTJOBS') {
            setPastJobsIsActive(true);
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
                    setClientRackets(clientRacketResponse.data);
                }
                stringJobs?.sort((a, b) => +new Date(b.jobDateTimeUtc) - +new Date(a.jobDateTimeUtc));
                response.stringJobs = stringJobs;
                setClient(response);
                if(stringJobs){
                    setStringJobs(stringJobs);
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
        <ClientDetailContext.Provider value={{clientId: clientId, clientRackets: clientRackets, stringJobs: stringJobs, setClientRackets: setClientRackets, setStringJobs: setStringJobs}}>
            <div className={clientDetailStyles.container}>
                <h2>{client?.firstName} {client?.lastName}</h2>
                <article className={clientDetailStyles.main_content_container}>
                    {pastJobsIsActive && client?.stringJobs && (
                        <StringJobList />
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
                                {isAdmin && (
                                    <>
                                        <p>Email: {client?.emailAddress}</p>
                                        <p>Phone: {client?.phoneNumber}</p>
                                    </>
                                )}
                                <p>Preferred Racket: {client?.racket}</p>
                            </div>
                            {isAdmin && (
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
        </ClientDetailContext.Provider>
    )
}