import { useState } from 'react'
import { useQuery } from 'react-query'
import { useClientDetailFormContext } from '../../contexts/ClientDetailFormContext'
import { Racket } from '../../models/Rackets/Racket'
import { GetAllRacketsAsync } from '../../services/RacketService'
import modalStyles from './client_racket_modal.module.css'

export type ClientRacketModalProps = {
    closeModal: (c: boolean) =>  void
}

export default function ClientRacketModal(props: ClientRacketModalProps) {
    const clientDetailFormContext = useClientDetailFormContext();
    const { data: racketData } = useQuery('racketData', async () => {
        const res = await GetAllRacketsAsync();
        if (res.status === 200) {
            return res.data as Racket[];
        }
    });
    const [racketExists, setRacketExists] = useState(true);
    const [modalTitle, setModalTitle] = useState("Assign Racket");

    const setModalState = (racketExists: boolean, title: string) => {
        setRacketExists(racketExists);
        setModalTitle(title);
    }
    
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
                        <form>
                            <label>Racket</label>
                            <select>
                                {racketData?.map((r)=> {
                                    return <option value={r.id} key={r.id}>{r.brand} {r.model} {r.year}</option>
                                })}
                            </select>
                        </form>
                        <button type="submit">Submit</button>
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