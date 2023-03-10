import { createContext, useContext } from 'react'
import { ClientRacket } from '../models/ClientRackets/ClientRacket'
import { Racket } from '../models/Rackets/Racket'

type ClientDetailContextType = {
    clientId: number;
    clientRackets: ClientRacket[];
    setClientRackets: (r: ClientRacket[]) => void;
};

const clientDetailContextDefault: ClientDetailContextType = {
    clientId: 0,
    clientRackets:[],
    setClientRackets: (r:ClientRacket[]) => {}
};

export const ClientDetailContext = createContext(clientDetailContextDefault);

export function useClientDetailContext() {
    return useContext(ClientDetailContext);
}