export type ClientRacket = {
    id: number,
    serialNumber: string,
    clientId: number,
    racketId: number,
    clientFirstName: string,
    clientLastName: string,
    racketBrand: string,
    racketModel: string,
    racketYear: string,
    timesStrung?: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}