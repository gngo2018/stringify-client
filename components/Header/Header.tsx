import Link from 'next/link'
import headerStyles from './header.module.css'

export default function Header() {
    return (
        <header className={headerStyles.header_container}>
            <Link href='/'>
                <h2>Stringify</h2>
            </Link>
            <div className={headerStyles.hamburger_menu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    )
}