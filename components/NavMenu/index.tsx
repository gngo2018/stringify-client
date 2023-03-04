import Link from 'next/link'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavMenuContext } from '../../contexts/NavMenuContext'
import menuStyles from './menu.module.css'

export default function NavMenu({ isOpen }: { isOpen: boolean }) {
    const { setIsOpen } = useNavMenuContext();
    const { isAdmin, setIsAdmin } = useAuthContext();
    function SignOut() {
        setIsOpen(false)
        localStorage.removeItem('userRole');
        localStorage.setItem('userRole', 'guest')
        setIsAdmin(false);
    }

    return (
        <div className={isOpen ? `${menuStyles.menu_container} ${menuStyles.menu_container_is_open} ` : menuStyles.menu_container}>
            {isAdmin ?
                <h4>Hello George</h4> :
                <h4>Menu</h4>
            }
            <Link legacyBehavior href='/Clients'>
                <span onClick={() => setIsOpen(false)}>Clients</span>
            </Link>
            <Link legacyBehavior href='/StringJobs'>
                <span onClick={() => setIsOpen(false)}>String Jobs</span>
            </Link>
            <Link legacyBehavior href='/Rackets'>
                <span onClick={() => setIsOpen(false)}>Rackets</span>
            </Link>
            <Link legacyBehavior href='/ClientRackets'>
                <span onClick={() => setIsOpen(false)}>Client Rackets</span>
            </Link>
            <span>Analytics</span>
            {isAdmin ?
                <span onClick={() => SignOut()}>Sign Out</span> :
                <Link legacyBehavior href='/SignIn'>
                    <span onClick={() => setIsOpen(false)}>Sign In</span>
                </Link>
            }
        </div>
    )
}