import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import googleStyles from './google.module.css'
import { useAuthContext } from '../../contexts/AuthContext';
export default function GoogleSignInButton() {
    const { data, status } = useSession();
    const { setIsAdmin } = useAuthContext();
    const [isLoading] = useState(false);
    useEffect(() => {
        if (data?.user?.email) {
            if (data.user.role === 'Admin') {
                setIsAdmin(true);
            }
        }
    }, [data?.user?.email])

    const handleSignOut = () => {
        signOut()
    }

    const handleSignIn = async () => {
        await signIn('google');
    }

    if (status === 'loading' || isLoading) {
        return (
            <h1> loading... please wait</h1>
        );
    }
    if (status === 'authenticated') {
        return (
            <button className={googleStyles.sign_out_button} onClick={() => handleSignOut()}>Sign out</button>
        );
    }
    return (
        <button className={googleStyles.sign_in_button} onClick={() => handleSignIn()}>Sign in with Google</button>
    );
}