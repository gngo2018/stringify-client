import { createContext, useContext } from 'react'
import { Racket } from '../models/Rackets/Racket';

type ClientDetailFormContextType = {
    clientId: number;
    racket: Racket;
    setRacket: (r: Racket) => void;
};

const clientDetailFormContextDefault: ClientDetailFormContextType = {
    clientId: 0,
    racket:{
        id: 0,
        brand: '',
        model: '',
        year: 0
    },
    setRacket: (r:Racket) => {}
};

export const ClientDetailFormContext = createContext(clientDetailFormContextDefault);

export function useClientDetailFormContext() {
    return useContext(ClientDetailFormContext);
}