import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useClientDetailContext } from '../../contexts/ClientDetailContext'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import { Racket } from '../../models/Rackets/Racket'
import { ClientRacketFormProps, CreateClientRacketAsync } from '../../services/ClientRacketService'
import { GetAllRacketsAsync } from '../../services/RacketService'
import modalStyles from './client_racket_modal.module.css'

export type ClientRacketModalProps = {
    closeModal: (c: boolean) =>  void
}

export default function ClientRacketModal(props: ClientRacketModalProps) {
    const clientDetailContext = useClientDetailContext();
    const clientRacketForm = useForm<ClientRacketFormProps>();
    const [racketExists, setRacketExists] = useState(true);
    const [modalTitle, setModalTitle] = useState("Assign Racket");
    const { data: racketData } = useQuery('racketData', async () => {
        const res = await GetAllRacketsAsync();
        if (res.status === 200) {
            const rackets = res.data as Racket[];
            rackets.sort((a, b) => {
                if (a.brand < b.brand) {
                    return -1;
                }
                if (a.brand > b.brand) {
                    return 1; 
                }
                return 0;
            });
            
            return rackets;
        }
    });

    const setModalState = (racketExists: boolean, title: string) => {
        setRacketExists(racketExists);
        setModalTitle(title);
    }

    const handleClientRacketFormOnSubmit = clientRacketForm.handleSubmit(async (data) => {
        data.clientId = clientDetailContext.clientId;   
        const racketDetails = racketData?.filter(r => r.id == data.racketId)[0];
        if(racketDetails){
            const response = await CreateClientRacketAsync(data);
            if (response.status === 200) {
                const createdClientRacket: ClientRacket = {
                    clientRacketId: response.data.id,
                    serialNumber: data.serialNumber,
                    clientId: data.clientId,
                    racketId: data.racketId,
                    clientFirstName: '',
                    clientLastName: '',
                    racketBrand: racketDetails.brand,
                    racketModel: racketDetails.model,
                    racketYear: racketDetails.year.toString(),
                    timesStrung: 0
                }
                const rackets = clientDetailContext.clientRackets;
                rackets.push(createdClientRacket);
                clientDetailContext.setClientRackets(rackets);
                props.closeModal(false);
            }
        }     
    });
    
    return (
        <>
            <div className='overlay'></div>
            <div className={modalStyles.container}>
                <div className={modalStyles.header_container}>
                    <h2>{modalTitle}</h2>
                    <span onClick={() => props.closeModal(false)}>X</span>
                </div>
                {racketExists && (
                    <>
                        <form className={modalStyles.client_racket_form} onSubmit={handleClientRacketFormOnSubmit}>
                            <label>Racket</label>
                            <select {...clientRacketForm.register('racketId')}>
                                <option value=''></option>
                                {racketData?.map((r)=> {
                                    return <option value={r.id} key={r.id}>{r.brand} {r.model} {r.year}</option>
                                })}
                            </select>
                            <label>Serial Number</label>
                            <input 
                                {...clientRacketForm.register('serialNumber')}
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <a onClick={() => setModalState(false, "Create Racket")}>Racket not found?</a>
                    </>
                )}
                {!racketExists && (
                    <>
                        <h3>Create new racket</h3>
                        <button type="submit">Submit</button>
                        <a onClick={() => setModalState(true, "Assign Racket")}>Racket exists?</a>
                    </>
                )}
            </div>
        </>
    )
}