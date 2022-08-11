import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Client } from '../../../models/Clients/Client'
import { UpdateClientAsync } from '../../../services/ClientService'
import clientUpdateStyles from './client_update.module.css'

export default function UpdateClient() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<Client>();
    const { client } = router.query;
    const [clientData, setClientData] = useState<Client>();

    const onSubmit = handleSubmit(async (data) => {
        if (clientData) {
            data.id = clientData.id;
            const response = await UpdateClientAsync(data);
            if (response.status === 200) {
                router.push('/Clients')
            }
            else {
                //TODO: Perform error handling
                console.log('Unable to update client');
            }
        }
    });

    useEffect(() => {
        if (client) {
            const data = JSON.parse(client.toString()) as Client;
            setClientData(data)
            reset(data)
        }
    }, [client]);

    return (
        <form className={clientUpdateStyles.container} onSubmit={onSubmit}>
            <h2>Update {clientData?.firstName}</h2>
            <label>First Name</label>
            <input
                {...register('firstName')}
                name="firstName"
                required
            />
            <label>Last Name</label>
            <input
                {...register('lastName')}
                name="lastName"
                required
            />
            <label>Phone Number</label>
            <input
                {...register('phoneNumber')}
                name="phoneNumber"
                required
            />
            <label>Email</label>
            <input
                {...register('emailAddress')}
                name="emailAddress"
                required
            />
            <label>Client Preferred Racket</label>
            <input
                {...register('racket')}
                name="racket"
                required
            />
            <button type="submit">
                Submit
            </button>
        </form>
    )
}