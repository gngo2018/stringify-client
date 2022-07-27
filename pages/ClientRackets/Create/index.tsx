import ClientRacketForm from '../../../components/ClientRackets/Form'
import createStyles from './create.module.css'

export default function ClientRacketCreate() {
    return(
        <main className={createStyles.container}>
            <h2>Client Racket Create</h2>
            <ClientRacketForm />
        </main>
    )
}