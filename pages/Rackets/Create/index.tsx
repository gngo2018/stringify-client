import RacketForm from '../../../components/Rackets/Form'
import createStyles from './create.module.css'
export default function CreateRacket() {
    return (
        <main className={createStyles.container}>
            <h2>Create Racket</h2>
            <RacketForm />
        </main>
    )
}