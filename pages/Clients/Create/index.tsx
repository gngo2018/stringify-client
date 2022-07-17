import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ClientCreate } from '../../../models/Clients/ClientCreate'
import { CreateClientAsync } from '../../../services/ClientService'
import createClientStyles from './client_create.module.css'

export default function CreateClient() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<ClientCreate>();

    const onSubmit = handleSubmit(async (data) => {
        const response = await CreateClientAsync(data);
        if (response.status === 200) {
            router.push('/Clients')
        }
        else {
            //TODO: Perform error handling
            console.log('Unable to create client');
        }
    });

    return (
        <form className={createClientStyles.container} onSubmit={onSubmit}>
            <h1>Create Client</h1>
            <label>First Name</label>
            <input
                {...register('firstName')}
                placeholder="First Name"
                name="firstName"
                required
            />
            <label>Last Name</label>
            <input
                {...register('lastName')}
                placeholder="Last Name"
                name="lastName"
                required
            />
            <label>Phone Number</label>
            <input
                {...register('phoneNumber')}
                placeholder="Phone Number"
                name="phoneNumber"
            />
            <label>Email</label>
            <input
                {...register('emailAddress')}
                placeholder="Email"
                name="emailAddress"
                
            />
            <label>Client Preferred Racket</label>
            <input
                {...register('racket')}
                placeholder="Racket"
                name="racket"
                required
            />
            <button type="submit">
                Submit
            </button>
        </form>
    )
}