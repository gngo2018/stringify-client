import { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { ClientRacket } from '../../models/ClientRackets/ClientRacket'
import ClientRacketCreateModal from './CreateModal'
import ClientRacketUpdateModal from './DetailModal'
import tableStyles from './client_racket_table.module.css'

export type ClientRacketTableProps = {
    clientRackets: ClientRacket[]
}

export default function ClientRacketTable(props: ClientRacketTableProps) {
    const { isAdmin } = useAuthContext();
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [clientRacket, setClientRacket] = useState<ClientRacket>();
    
    const handleClientRacketOnClick = (clientRacket: ClientRacket) => {
        setClientRacket(clientRacket);
        setUpdateModalIsOpen(true);
    }

    const updateClientRacketValue = (cr: ClientRacket) => {

    }

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
                            <div key={cr.clientRacketId} className={tableStyles.table_row} onClick={() => handleClientRacketOnClick(cr)}>
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
                <button className={tableStyles.add_button} onClick={() => setCreateModalIsOpen(!createModalIsOpen)}>Add Racket</button>
            </div>
            {createModalIsOpen && (
                <ClientRacketCreateModal setCreateModalIsOpen={(isOpen) => setCreateModalIsOpen(isOpen)}/>
            )}

            {updateModalIsOpen && clientRacket && (
                <ClientRacketUpdateModal 
                    setUpdateModalIsOpen={(isOpen) => setUpdateModalIsOpen(isOpen)}
                    setUpdatedClientRecord={(cr) => updateClientRacketValue(cr)} 
                    clientRacket={clientRacket}
                />
            )}
        </>
    )
}