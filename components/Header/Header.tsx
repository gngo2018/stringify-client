import { useState } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import headerStyles from './header.module.css'
import NavMenu from '../NavMenu'
import { NavMenuContext, useNavMenuContext } from '../../contexts/NavMenuContext'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuOnClick = () => {
        const inMemIsOpen = isOpen;
        setIsOpen(!inMemIsOpen);
    }
    return (
        <>
            <NavMenuContext.Provider value={{isOpen, setIsOpen }}>
                <header className={headerStyles.header_container}>
                    <Link href='/'>
                        <div className={headerStyles.image}>
                            <Image 
                                src='/assets/StringifyLogoHorizontal.png'
                                objectFit='contain'
                                alt='header-image'
                                layout='fill'
                            />
                        </div>
                    </Link>
                    <div className={headerStyles.hamburger_menu} onClick={() => handleMenuOnClick()}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </header>
                {isOpen && (
                    <NavMenu isOpen={isOpen} />
                )}
            </NavMenuContext.Provider>
        </>
    )
}