import { createContext, useContext } from 'react'
import { ClientRacket } from '../models/ClientRackets/ClientRacket'
import { StringJob } from '../models/StringJobs/StringJob'

type ClientDetailContextType = {
    clientId: number;
    clientRackets: ClientRacket[];
    stringJobs?: StringJob[];
    setClientRackets: (r: ClientRacket[]) => void;
    setStringJobs: (sj: StringJob[]) => void;
};

const clientDetailContextDefault: ClientDetailContextType = {
    clientId: 0,
    clientRackets:[],
    stringJobs: [],
    setClientRackets: (r:ClientRacket[]) => {},
    setStringJobs: (sj: StringJob[]) => {}
};

export const ClientDetailContext = createContext(clientDetailContextDefault);

export function useClientDetailContext() {
    return useContext(ClientDetailContext);
}