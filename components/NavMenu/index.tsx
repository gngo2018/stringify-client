import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavMenuContext } from '../../contexts/NavMenuContext'
import GoogleSignInButton from '../Modules/GoogleSignInButton'
import menuStyles from './menu.module.css'

export default function NavMenu({ isOpen }: { isOpen: boolean }) {
    const { setIsOpen } = useNavMenuContext();
    const { isAdmin, setIsAdmin } = useAuthContext();
    const { data, status } = useSession();

    function SignOut() {
        setIsOpen(false)
        localStorage.removeItem('userRole');
        localStorage.setItem('userRole', 'guest')
        setIsAdmin(false);
    }

    return (
        <div className={isOpen ? `${menuStyles.menu_container} ${menuStyles.menu_container_is_open} ` : menuStyles.menu_container}>
            {data?.user?.name ?
                <h4>Hello {data.user.name}</h4> :
                <h4>Menu</h4>
            }
            <Link href='/Clients'>
                <span onClick={() => setIsOpen(false)}>Clients</span>
            </Link>
            <Link href='/StringJobs'>
                <span onClick={() => setIsOpen(false)}>String Jobs</span>
            </Link>
            <Link href='/Rackets'>
                <span onClick={() => setIsOpen(false)}>Rackets</span>
            </Link>
            <Link href='/ClientRackets'>
                <span onClick={() => setIsOpen(false)}>Client Rackets</span>
            </Link>
            {isAdmin && (
                <Link href='/Analytics'>
                    <span onClick={() => setIsOpen(false)}>Analytics</span>
                </Link>
            )}
            <GoogleSignInButton />
        </div>
    )
}