import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useNavMenuContext } from '../../contexts/NavMenuContext'
import menuStyles from './menu.module.css'

export default function NavMenu({ isOpen }: { isOpen: boolean }) {
    const { setIsOpen } = useNavMenuContext();
    const [userRole, setUserRole] = useState<string>();
    function SignOut() {
        setIsOpen(false)
        localStorage.removeItem('userRole');
        localStorage.setItem('userRole', 'guest')
    }

    useEffect(() => {
        const currentUserRole = localStorage.getItem('userRole');
        if (currentUserRole) {
            setUserRole(currentUserRole);
        }
    }, [])

    return (
        <div className={isOpen ? `${menuStyles.menu_container} ${menuStyles.menu_container_is_open} ` : menuStyles.menu_container}>
            {userRole === 'admin' ?
                <h4>Hello George</h4> :
                <h4>Menu</h4>
            }
            <Link href='/Clients'>
                <span onClick={() => setIsOpen(false)}>Clients</span>
            </Link>
            <Link href='/StringJobs'>
                <span onClick={() => setIsOpen(false)}>String Jobs</span>
            </Link>
            <span>Analytics</span>
            {userRole === 'admin' ?
                <span onClick={() => SignOut()}>Sign Out</span> :
                <Link href='/SignIn'>
                    <span onClick={() => setIsOpen(false)}>Sign In</span>
                </Link>
            }
        </div>
    )
}