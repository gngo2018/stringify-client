import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as ClientRacketService from '../../services/ClientRacketService'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import { Client } from '../../models/Clients/Client'
import { StringJobFormFields } from '../../models/StringJobs/StringJobForm'
import * as StringJobService from '../../services/StringJobService'
import formStyles from './form.module.css'

export interface FormProps {
    source: string
    clients?: Client[]
    stringJobId?: number,
}

export default function StringJobForm(props: FormProps) {
    const router = useRouter();
    const { register, handleSubmit, setValue, reset } = useForm<StringJobFormFields>();
    const [clientRackets, setClientRackets] = useState<ClientRacket[]>([])

    async function GetRacketsByClientId(e: string){
        if(e === ''){
            setClientRackets([]);
        }
        else{
            const response = await ClientRacketService.GetRacketsByClientId(parseInt(e));
            if(response.status === 200){
                setClientRackets(response.data);
            }
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        let response: AxiosResponse;
        
        if (props.source === 'update' && props.stringJobId) {
        console.log(data);
            response = await StringJobService.UpdateStringJobAsync(props.stringJobId, data);
        }
        else {
            response = await StringJobService.CreateStringJobAsync(data);
        }

        if(response.status === 200){
            router.push('/StringJobs');
        }
    });

    useEffect(() => {
        async function GetStringJobById(id: number){
            const response = await StringJobService.GetStringJobById(id);
            if(response.status === 200){
                const stringJob = response.data;
                reset(stringJob);
            }

            const clientId = response.data.clientId;
            await GetRacketsByClientId(clientId);
        }

        if(props.source === 'update' && props.stringJobId){
            GetStringJobById(props.stringJobId);
        }
    }, [props])

    return (
        <form className={formStyles.form_container} onSubmit={onSubmit}>
            <label>Date</label>
            <input
                {...register('jobDateTimeUtc')}
                placeholder="Job Date"
                type='date'
            />
            <label>Client</label>
            <select {...register('clientId')} onChange={(e) => GetRacketsByClientId(e.target.value)}>
                <option value=''></option>
                {props.clients && (
                    props.clients.map((c) => {
                        return (
                            <option key={c.id} value={c.id}>
                                {c.firstName} {c.lastName}
                            </option>
                        )
                    })
                )}
            </select>
            <label>Racket</label>
            <select {...register('clientRacketId')}>
                {clientRackets && (
                    clientRackets.map((cr) => {
                        return (
                            <option key={cr.clientRacketId} value={cr.clientRacketId}>
                                {cr.serialNumber} - {cr.racketBrand} {cr.racketModel} {cr.racketYear}
                            </option>
                        )
                    })
                )}
            </select>
            <label>String</label>
            <input
                {...register('stringName')}
            />
            <label>String Type</label>
            <select {...register('stringType')}>
                <option value="Polyester">Polyester</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Multifillament">Multifillament</option>
                <option value="Synthetic Gut">Synthetic Gut</option>
            </select>
            <label>Tension</label>
            <input
                {...register('tension')}
                type="number"
            />
            <select {...register('tensionType')}>
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
            </select>
            <label>Charge Amount</label>
            <input
                {...register('chargeAmount')}
                type="number"
            />
            <label>Notes</label>
            <textarea
                {...register('notes')}
                placeholder="Notes"
            />
            <button type='submit'>Submit</button>
        </form>
    )
}