import modalStyles from './client_racket_modal.module.css'

export type ClientRacketModalProps = {
    closeModal: (c: boolean) =>  void
}

export default function ClientRacketModal(props: ClientRacketModalProps) {

    return (
        <>
            <div className='overlay'></div>
            <div className={modalStyles.container}>
                <div className={modalStyles.header_container}>
                    <h2>Assign Racket</h2>
                    <span onClick={() => props.closeModal(false)}>X</span>
                </div>
            </div>
        </>
    )
}