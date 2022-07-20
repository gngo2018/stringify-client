import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { UserCredentials, SignIn } from '../../services/AuthService'
import formStyles from './form.module.css'

export default function SignInForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<UserCredentials>();

    const onSubmit = handleSubmit(async (data) => {
        await SignIn(data);
        router.push('/');
    })

    return(
        <form className={formStyles.form} onSubmit={onSubmit}>
            <label>Username</label>
            <input
                {...register('userName')}
                placeholder="Username"
            />
            <label>Password</label>
            <input
                {...register('password')}
                placeholder="Password"
                type='password'
            />
            <button type='submit'>Sign In</button>
        </form>
    )
}