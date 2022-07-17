import Link from 'next/link'
import { useNavMenuContext } from '../../contexts/NavMenuContext'
import menuStyles from './menu.module.css'

export default function NavMenu({isOpen} : {isOpen: boolean}) {
    const {setIsOpen} = useNavMenuContext();

    return(
        <div className={isOpen ? `${menuStyles.menu_container} ${menuStyles.menu_container_is_open} ` : menuStyles.menu_container}>
            <h4>Menu</h4>
            <Link href='/Clients'>
                <span onClick={() => setIsOpen(false)}>Clients</span>
            </Link>
            <Link href='StringJobs'>
                <span onClick={() => setIsOpen(false)}>String Jobs</span>
            </Link>
            <span>Analytics</span>
            <span>Sign In</span>
        </div>
    )
}