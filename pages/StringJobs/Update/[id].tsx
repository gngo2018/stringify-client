import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Form from '../../../components/StringJobs/Form'
import { Client } from '../../../models/Clients/Client'
import * as ClientService from '../../../services/ClientService'
import updateStyles from './update.module.css'

export default function UpdateStringJob() {
    const router = useRouter();
    const { id } = router.query;
    const [clients, setClients] = useState<Client[]>()
    const [stringJobId, setStringJobId] = useState(0);
    useEffect(() => {
        async function SetFormProps() {
            if(id){
                const response = await ClientService.GetAllClientsAsync();
                setClients(response);
                setStringJobId(parseInt(id.toString()));
            }
        }
        SetFormProps();
    }, [id]);

    return (
        <main>
            <h2>Update String Job</h2>
            <Form source='update' clients={clients} stringJobId={stringJobId}/>
        </main>
    )
}