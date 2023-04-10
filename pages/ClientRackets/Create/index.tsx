import ClientRacketForm from '../../../components/ClientRackets/CreateForm'
import createStyles from './create.module.css'

export default function ClientRacketCreate() {
    return(
        <main className={createStyles.container}>
            <h2>Client Racket Create</h2>
            <ClientRacketForm />
        </main>
    )
}