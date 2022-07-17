import { StringJob } from "../StringJobs/StringJob"

export type Client = {
    id: number
    firstName: string
    lastName: string
    racket: string
    phoneNumber?: string
    emailAddress?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    stringJobs?: StringJob[]
}