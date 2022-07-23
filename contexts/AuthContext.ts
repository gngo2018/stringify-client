import { createContext, useContext } from 'react'

type AuthContextType = {
    isAdmin: boolean;
    setIsAdmin: (a: boolean) => void
};

const authContextDefault: AuthContextType = {
    isAdmin: false,
    setIsAdmin: (a: boolean) => {}
};

export const AuthContext = createContext(authContextDefault);

export function useAuthContext() {
    return useContext(AuthContext);
}