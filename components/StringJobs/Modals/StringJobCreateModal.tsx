import { useForm } from 'react-hook-form'
import { useClientDetailContext } from '../../../contexts/ClientDetailContext';
import { StringJobFormFields } from '../../../models/StringJobs/StringJobForm'
import * as ClientRacketService from '../../../services/ClientRacketService'
import * as StringJobService from '../../../services/StringJobService'
import modalStyles from './modal.module.css'

export type StringJobCreateModalProps = {
    setCreateModalIsOpen: (c: boolean) => void
}

export default function StringJobCreateModal(props: StringJobCreateModalProps) {
    const { register, handleSubmit, setValue, reset } = useForm<StringJobFormFields>();
    const clientDetailContext = useClientDetailContext();

    const onSubmit = handleSubmit(async (data) => {
        data.clientId = clientDetailContext.clientId;
        const response = await StringJobService.CreateStringJobAsync(data);

        if (response.status === 200) {
            const stringJobs = clientDetailContext.stringJobs;
            const clientRacket = clientDetailContext.clientRackets.filter(cr => cr.clientRacketId === response.data.clientRacketId)[0];
            const racket = `${clientRacket.racketBrand} ${clientRacket.racketModel} ${clientRacket.racketYear}`
            response.data.racket = racket;
            stringJobs?.push(response.data);
            if(stringJobs){
                clientDetailContext.setStringJobs(stringJobs);
                props.setCreateModalIsOpen(false);
            }
        }
    });

    return (
        <>
            <div className='overlay'></div>
            <main className={modalStyles.container}>
            <div className={modalStyles.header_container}>
                    <h2>Create String Job</h2>
                    <span onClick={() => props.setCreateModalIsOpen(false)}>X</span>
                </div>
                    <form className={modalStyles.form_container} onSubmit={onSubmit}>
                        <label>Date</label>
                        <input
                            {...register('jobDateTimeUtc')}
                            placeholder="Job Date"
                            type='date'
                        />
                        <label>Racket</label>
                        <select {...register('clientRacketId')}>
                            {clientDetailContext.clientRackets && (
                                clientDetailContext.clientRackets.map((cr) => {
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
            </main>
        </>
    )
}