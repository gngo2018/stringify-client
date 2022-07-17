import { createContext, useContext } from 'react'

type NavMenuContextType = {
    isOpen: boolean;
    setIsOpen: (o: boolean) => void;
};

const navMenuContextDefault: NavMenuContextType = {
    isOpen: false,
    setIsOpen: (o: boolean) => { },
};

export const NavMenuContext = createContext(navMenuContextDefault);

export function useNavMenuContext() {
    return useContext(NavMenuContext);
}