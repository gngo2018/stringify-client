import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Client } from '../../../models/Clients/Client'
import { UpdateClientAsync } from '../../../services/ClientService'
import clientUpdateStyles from './client_update.module.css'
import { ClientCreate } from '../../../models/Clients/ClientCreate'

export default function UpdateClient() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<Client>();
    const { client } = router.query;
    const [clientData, setClientData] = useState<Client>();

    const onSubmit =  handleSubmit(async (data) => {
        if(clientData){
            data.id = clientData.id;
            const response = await UpdateClientAsync(data);
            if(response.status === 200){
                router.push('/Clients')
            }
            else{
                //TODO: Perform error handling
                console.log('Unable to update client');
            }
        }
    });

    useEffect(() => {
        if (client) {
            const data = JSON.parse(client.toString()) as Client;
            setClientData(data)
        }
    }, [client]);

    return (
        <form className={clientUpdateStyles.container} onSubmit={onSubmit}>
            <h2>Update {clientData?.firstName}</h2>
            <label>First Name</label>
            <input
                {...register('firstName')}
                placeholder={clientData?.firstName}
                name="firstName"
                required
            />
            <label>Last Name</label>
            <input
                {...register('lastName')}
                placeholder={clientData?.lastName}
                name="lastName"
                required
            />
            <label>Client Preferred Racket</label>
            <input
                {...register('racket')}
                placeholder={clientData?.racket}
                name="racket"
                required
            />
            <button type="submit">
                Submit
            </button>
        </form>
    )
}