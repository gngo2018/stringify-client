import { useEffect, useState } from 'react'
import Form, { FormProps } from '../../../components/StringJobs/Form'
import { Client } from '../../../models/Clients/Client'
import * as ClientService from '../../../services/ClientService'
import createStyles from './string_job_create.module.css'

export default function CreateStringJob() {
    const [clients, setClients] = useState<Client[]>()
    useEffect(() => {
        async function SetFormProps(){
            const response = await ClientService.GetAllClients();
            setClients(response);
        }
        SetFormProps();
    }, []);
    
    return(
        <main>
            <h2>Create String Job</h2>
            <Form source='create' clients={clients}/>
        </main>
    )
}