import SignInForm from '../../components/SignIn/Form'
import signInStyles from './sign_in.module.css'
export default function SignIn(){
    return(
        <main className={signInStyles.container}>
            <h2>Sign in</h2>
            <SignInForm />
        </main>
    )
}