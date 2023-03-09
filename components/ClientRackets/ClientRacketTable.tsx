import { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import ClientRacketModal from './ClientRacketModal'
import tableStyles from './client_racket_table.module.css'

export type ClientRacketTableProps = {
    clientRackets: ClientRacket[]
}

export default function ClientRacketTable(props: ClientRacketTableProps) {
    const { isAdmin } = useAuthContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <>
            <div className={tableStyles.table}>
                <div className={tableStyles.table_header}>
                    {isAdmin && (
                        <h4>S/N</h4>
                    )}
                    <h4>Brand</h4>
                    <h4>Model</h4>
                    <h4>Year</h4>
                    <h4>Strung</h4>
                </div>
                {props.clientRackets && (
                    props.clientRackets.map(cr => {
                        return (
                            <div key={cr.clientRacketId} className={tableStyles.table_row}>
                                {isAdmin && (
                                    <span>{cr.serialNumber}</span>
                                )}
                                <span>{cr.racketBrand}</span>
                                <span>{cr.racketModel}</span>
                                <span>{cr.racketYear}</span>
                                <span>{cr.timesStrung}</span>
                            </div>
                        )
                    })
                )}
            </div>
            <div className={tableStyles.button_container}>
                <button className={tableStyles.add_button} onClick={() => setModalIsOpen(!modalIsOpen)}>Add Racket</button>
            </div>
            {modalIsOpen && (
                <ClientRacketModal closeModal={(close) => setModalIsOpen(close)}/>
            )}
        </>
    )
}