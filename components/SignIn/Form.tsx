import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import { UserCredentials, SignIn } from '../../services/AuthService'
import formStyles from './form.module.css'

export default function SignInForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<UserCredentials>();
    const { setIsAdmin } = useAuthContext();

    const onSubmit = handleSubmit(async (data) => {
        SignIn(data);
        const userRole = localStorage.getItem('userRole');
        if(userRole === 'admin'){
            setIsAdmin(true);
        }
        router.back();
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