import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Client } from '../../models/Clients/Client'
import { Racket } from '../../models/Rackets/Racket'
import * as ClientService from '../../services/ClientService'
import * as RacketService from '../../services/RacketService'
import { CreateClientRacketAsync, ClientRacketFormProps } from '../../services/ClientRacketService'
import formStyles from './form.module.css'

export default function ClientRacketForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<ClientRacketFormProps>();
    const [clients, setClients] = useState<Client[]>([]);
    const [rackets, setRackets] = useState<Racket[]>([]);

    const onSubmit = handleSubmit(async (data) => {
        const response = await CreateClientRacketAsync(data);
        if (response.status === 200) {
            router.push('/ClientRackets');
        }
    });

    useEffect(() => {
        async function GetClientsAndRackets() {
            const clientResponse = await ClientService.GetAllClientsAsync();
            if (clientResponse) {
                setClients(clientResponse);
            }

            const racketResponse = await RacketService.GetAllRacketsAsync();
            if (racketResponse.status === 200) {
                const rackets: Racket[] = racketResponse.data;
                rackets.sort((a, b) => {
                    if (a.brand < b.brand) {
                        return -1;
                    }
                    if (a.brand > b.brand) {
                        return 1; 
                    }
                    return 0;
                });

                setRackets(racketResponse.data);
            }
        }

        GetClientsAndRackets();
    }, []);

    return (
        <form className={formStyles.form_container} onSubmit={onSubmit}>
            <label>Serial Number</label>
            <input
                {...register('serialNumber')}
                required
            />
            <label>Client</label>
            <select {...register('clientId')}>
                <option value=''></option>
                {clients && (
                    clients.map((c) => {
                        return (
                            <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                        )
                    })
                )}
            </select>
            <label>Racket</label>
            <select {...register('racketId')}>
                <option value=''></option>
                {rackets && (
                    rackets.map((r) => {
                        return (
                            <option key={r.id} value={r.id}>{r.brand} {r.model} {r.year}</option>
                        )
                    })
                )}
            </select>
            <button type='submit'>Submit</button>
        </form>
    )
}