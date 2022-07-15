import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ClientCreate } from '../../../models/Clients/ClientCreate'
import { CreateClientAsync } from '../../../services/ClientService'
import createClientStyles from './client_create.module.css'

export default function CreateClient() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<ClientCreate>();

    const onSubmit =  handleSubmit(async (data) => {
        console.log(data);
        const response = await CreateClientAsync(data);
        if(response.status === 200){
            router.push('/Clients')
        }
        else{
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
                placeholder="FirstName"
                name="firstName"
                required
            />
            <label>Last Name</label>
            <input
                {...register('lastName')}
                placeholder="LastName"
                name="lastName"
                required
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