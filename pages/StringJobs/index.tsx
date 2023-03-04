import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as StringJobService from '../../services/StringJobService'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import { StringJobListItem } from '../../models/StringJobs/StringJobListItem'
import { Client } from '../../models/Clients/Client'
import { GetAllClientsAsync } from '../../services/ClientService'
import stringJobStyles from './string_job.module.css'

export default function StringJobs() {
    const router = useRouter();
    const [clients, setClients] = useState<Client[]>();
    const [stringJobs, setStringJobs] = useState<StringJobListItem[]>();
    const [stringJobsByClient, setStringJobsByClient] = useState<StringJobListItem[]>();

    const handleCreateButtonClick = () => {
        router.push('/StringJobs/Create')
    }

    const handleSelectOnChange = (clientId: string) => {
        const inMemoryStringJobs = stringJobs;
        if(clientId !== ''){
            const id = parseInt(clientId);
            const filteredClients = inMemoryStringJobs?.filter(sr => sr.clientId === id);
            setStringJobsByClient(filteredClients);
        }
        else{
            setStringJobsByClient(inMemoryStringJobs);
        }
    }

    useEffect(() => {
        async function GetAllClients() {
            const clients = await GetAllClientsAsync();
            if(clients){
                setClients(clients)
            }
        }
        
        async function GetAllStringJobs() {
            const response = await StringJobService.GetAllStringJobsAsync();
            if (response.status === 200) {
                const jobs = response.data;
                jobs.sort((a, b) => +new Date(b.jobDateTimeUtc) - +new Date(a.jobDateTimeUtc));
                setStringJobs(jobs);
                setStringJobsByClient(jobs);
            }
        }
        GetAllClients();
        GetAllStringJobs();
    }, []);
    return (
        <main className={stringJobStyles.container}>
            <HeaderContainer name="Stringing" handleButtonClick={handleCreateButtonClick} />
            <div className={stringJobStyles.client_select_container}>
                <select onChange={(e) => handleSelectOnChange(e.target.value)}>
                    <option value=''></option>
                    {clients && (
                        clients.map((c) => {
                            return <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                        })
                    )}
                </select>
            </div>
            <div className={stringJobStyles.table}>
                <div className={stringJobStyles.table_header}>
                    <h4>Date</h4>
                    <h4>Client</h4>
                    <h4>S/N</h4>
                    <h4>Racket</h4>
                </div>
                {stringJobs && stringJobsByClient && (
                    stringJobsByClient.map(sj => {
                        return (
                            <Link legacyBehavior href={'/StringJobs/Detail/' + sj.stringJobId} key={sj.stringJobId}>
                                <div className={stringJobStyles.table_row}>
                                    <span>{sj.jobDateTimeUtc.toString()}</span>
                                    <span>{sj.clientFirstName}</span>
                                    <span>{sj.racketSerialNumber}</span>
                                    <span>{sj.racketName}</span>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </main>
    )
}