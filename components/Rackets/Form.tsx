import { useForm } from 'react-hook-form'
import { useClientDetailContext } from '../../contexts/ClientDetailContext'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import { ClientRacketFormProps, CreateClientRacketAsync } from '../../services/ClientRacketService'
import { CreateRacketAsync, GetStaticRacketBrands, RacketProps } from '../../services/RacketService'
import formStyles from './form.module.css'

export type RacketFormProps = {
    setCreateModalIsOpen: (c: boolean) =>  void
}

export default function RacketForm(props: RacketFormProps) {
    const clientDetailContext = useClientDetailContext();
    const { register, handleSubmit } = useForm<RacketProps>();
    const racketBrands = GetStaticRacketBrands();
    const onSubmit = handleSubmit(async (data) => {
        const response = await CreateRacketAsync(data);
        if (response.status === 200) {
            if (clientDetailContext.clientId && clientDetailContext.clientId !== 0 && data.serialNumber) {
                const clientRacketFormProps: ClientRacketFormProps = {
                    serialNumber: data.serialNumber,
                    clientId: clientDetailContext.clientId,
                    racketId: response.data.id
                }
                const clientRacketResponse = await CreateClientRacketAsync(clientRacketFormProps);

                if (clientRacketResponse.status === 200) {
                    const createdClientRacket: ClientRacket = {
                        clientRacketId: clientRacketResponse.data.id,
                        serialNumber: data.serialNumber,
                        clientId: clientDetailContext.clientId,
                        racketId: response.data.id,
                        clientFirstName: '',
                        clientLastName: '',
                        racketBrand: data.brand,
                        racketModel: data.model,
                        racketYear: data.year.toString(),
                        timesStrung: 0
                    }
                    const rackets = clientDetailContext.clientRackets;
                    rackets.push(createdClientRacket);
                    clientDetailContext.setClientRackets(rackets);
                    props.setCreateModalIsOpen(false);
                }
            }
        }
    });

    return (
        <form className={formStyles.form} onSubmit={onSubmit}>
            <label>Brand</label>
            <select {...register('brand')}>
                <option value=''></option>
                {racketBrands && (
                    racketBrands.map((b) => {
                        return (
                            <option key={b.id} value={b.name}>{b.name}</option>
                        )
                    })
                )}
            </select>
            <label>Model</label>
            <input
                {...register('model')}
                required
            />
            <label>Year</label>
            <input
                {...register('year')}
                type='number'
                required
            />
            <label>Serial Number</label>
            <input
                {...register('serialNumber')}
                type='text'
            />
            <button>Submit</button>
        </form>
    )
}