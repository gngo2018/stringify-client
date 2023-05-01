import { useState } from 'react';
import { useClientDetailContext } from '../../contexts/ClientDetailContext'
import StringJobCreateModal from './Modals/StringJobCreateModal'
import stringJobListStyles from './list.module.css'

export default function StringJobList() {
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const clientDetailContext = useClientDetailContext();
    return (
        <section className={stringJobListStyles.string_job_history_container}>
            <div className={stringJobListStyles.string_job_detail_container}>
                {clientDetailContext.stringJobs && (
                    clientDetailContext.stringJobs.map(sj => {
                        return (
                            <div className={stringJobListStyles.string_job_card} key={sj.id}>
                                <span>Date: {sj.jobDateTimeUtc.toString()}</span>
                                <span>Racket: {sj.racket}</span>
                                <span>String: {sj.stringName}</span>
                                <span>String Type: {sj.stringType}</span>
                                <span>Tension: {sj.tension} {sj.tensionType}</span>
                            </div>
                        )
                    })
                )}
            </div>
            <div className={stringJobListStyles.button_container}>
                <button onClick={() => setCreateModalIsOpen(true)}>Add String Job</button>
            </div>
            {createModalIsOpen && (
                <StringJobCreateModal setCreateModalIsOpen={(c) => setCreateModalIsOpen(c)}/>
            )}
        </section>
    )
}