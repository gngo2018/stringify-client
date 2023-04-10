import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import StringJobForm from '../../../components/StringJobs/Form'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Client } from '../../../models/Clients/Client'
import * as ClientService from '../../../services/ClientService'
import createStyles from './string_job_create.module.css'

export default function CreateStringJob() {
    const router = useRouter();
    const { isAdmin } = useAuthContext();
    const [clients, setClients] = useState<Client[]>()
    
    useEffect(() => {
        async function SetFormProps(){
            const response = await ClientService.GetAllClientsAsync();
            setClients(response);
        }
        if(!isAdmin){
            router.push('/StringJobs')
        }
        SetFormProps();
    }, [router]);
    
    return(
        <main className={createStyles.container}>
            <h2>Create String Job</h2>
            <StringJobForm source='create' clients={clients} />
        </main>
    )
}