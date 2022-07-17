import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Client } from '../../models/Clients/Client'
import { StringJobForm } from '../../models/StringJobs/StringJobForm'
import * as StringJobService from '../../services/StringJobService'
import formStyles from './form.module.css'

export interface FormProps {
    source: string
    clients?: Client[]
    stringJobId?: number
}

export default function Form(props: FormProps) {
    const router = useRouter();
    const { register, handleSubmit } = useForm<StringJobForm>();

    const onSubmit = handleSubmit(async (data) => {
        let response: AxiosResponse;
        if (props.source === 'update' && props.stringJobId) {
            response = await StringJobService.UpdateStringJobAsync(props.stringJobId, data);
        }
        else {
            response = await StringJobService.CreateStringJobAsync(data);
        }

        if(response.status === 200){
            console.log(response.data);
            router.push('/StringJobs');
        }
    });

    return (
        <form className={formStyles.form_container} onSubmit={onSubmit}>
            <label>Date</label>
            <input
                {...register('jobDateTimeUtc')}
                placeholder="Job Date"
                type='date'
            />
            <label>Client</label>
            <select {...register('clientId')}>
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
            <input
                {...register('racket')}
                placeholder="Racket"
            />
            <label>String</label>
            <input
                {...register('stringName')}
                placeholder="String"
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
            <textarea
                {...register('notes')}
                placeholder="Notes"
            />
            <button type='submit'>Submit</button>
        </form>
    )
}