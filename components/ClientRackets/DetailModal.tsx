import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import { ClientRacketFormProps, UpdateClientRacketAsync } from '../../services/ClientRacketService'
import modalStyles from './client_racket_modal.module.css'
import detailModalStyles from './detail_modal.module.css'

export type ClientRacketUpdateModalProps = {
    clientRacket: ClientRacket,
    setUpdatedClientRecord: (cr: ClientRacket) => void
    setUpdateModalIsOpen: (c: boolean) => void
}

export default function ClientRacketUpdateModal(props: ClientRacketUpdateModalProps) {
    const { register, handleSubmit, reset } = useForm<ClientRacketFormProps>();
    const { isAdmin } = useAuthContext();
    const [updateButtonIsDisabled, setUpdateButtonIsDisabled] = useState(true);
    const onSubmit = handleSubmit(async (data) => {
        const response = await UpdateClientRacketAsync(data);
        if(response.status === 200){
            //TODO: Set new updated client data after update
            // const updatedClient: ClientRacket = {
            //     clientRacketId: response.data.id,
            //     serialNumber: response.data.serialNumber,
            //     clientId: response.data.clientId,
            //     racketId: response.data.racketId,
            //     clientFirstName: '',
            //     clientLastName: '',
            //     racketBrand: '',
            //     racketModel: '',
            //     racketYear: ''
            // }
            //props.setUpdatedClientRecord(updatedClient);

            props.setUpdateModalIsOpen(false);
        }
    });

    const validateSerialNumberHasChanged = (e: any) => {
        const value = e.target.value;
        if (updateButtonIsDisabled && props.clientRacket.serialNumber !== value) {
            setUpdateButtonIsDisabled(false);
        }
    }

    useEffect(() => {
        reset({
            clientRacketId: props.clientRacket.clientRacketId,
            serialNumber: props.clientRacket.serialNumber,
            clientId: props.clientRacket.clientId,
            racketId: props.clientRacket.racketId
        });
    }, [props.clientRacket, reset]);

    return (
        <>
            <div className='overlay'></div>
            <div className={modalStyles.container}>
                <div className={modalStyles.header_container}>
                    <h2>Client Racket Details</h2>
                    <span onClick={() => props.setUpdateModalIsOpen(false)}>X</span>
                </div>
                <form className={detailModalStyles.form_container} onSubmit={onSubmit}>
                    <label>Serial Number</label>
                    {isAdmin ?
                        <input
                            {...register('serialNumber', {
                                onChange: (e) => validateSerialNumberHasChanged(e)
                            })}
                            required
                        /> :
                        <span>{props.clientRacket.serialNumber}</span>
                    }
                    <label>Owner</label>
                    <span>{props.clientRacket.clientFirstName} {props.clientRacket.clientLastName}</span>
                    <label>Racket</label>
                    <span>{props.clientRacket.racketBrand} {props.clientRacket.racketModel}</span>
                    <label>Year</label>
                    <span>{props.clientRacket.racketYear}</span>
                    <label>Times Strung</label>
                    <span>{props.clientRacket.timesStrung}</span>
                    {isAdmin && (
                        <>
                            <button disabled={updateButtonIsDisabled} type='submit'>Update</button>
                            <button type='button' className='delete-btn'>Delete</button>
                        </>
                    )}
                </form>
            </div>
        </>
    )
}