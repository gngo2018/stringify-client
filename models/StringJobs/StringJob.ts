export type StringJob = {
    id: number;
    jobDateTimeUtc: Date;
    clientId: number;
    racket: string;
    stringName: string;
    stringType: string;
    tension: number;
    tensionType: string;
    chargeAmount: number;
    notes: string;
    clientName?: string;
}