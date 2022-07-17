import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Client } from '../../../models/Clients/Client'
import { StringJob } from '../../../models/StringJobs/StringJob'
import * as ClientService from '../../../services/ClientService'
import * as StringJobService from '../../../services/StringJobService'
import detailStyles from './detail.module.css'

export default function StringJobDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [stringJob, setStringJob] = useState<StringJob>()
    const [client, setClient] = useState<Client>()

    const handleDelete = async () => {
        const result = confirm('Are you sure you want to delete this job?')
        if (result === true && id) {
            const stringJobId = parseInt(id?.toString());
            const response = await StringJobService.DeleteStringJobAsync(stringJobId);
            if (response.status === 204) {
                router.push('/StringJobs')
            }
        }
    }

    useEffect(() => {
        async function GetStringJobDetail() {
            if (id) {
                const stringJobId = parseInt(id.toString());
                const response = await StringJobService.GetStringJobById(stringJobId);
                if (response.status === 200) {
                    setStringJob(response.data);

                    const client = await ClientService.GetClientById(response.data.clientId);
                    setClient(client)
                }
            }
        }

        GetStringJobDetail();
    }, [id]);
    return (
        <main className={detailStyles.detail_container}>
            <h2>Job Detail - {client?.firstName} {client?.lastName}</h2>
            <div className={detailStyles.button_container}>
                <Link href={'/StringJobs/Update/' + stringJob?.id}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete()}>Delete</button>
            </div>
            <label>Date Requested</label>
            <span>{stringJob?.jobDateTimeUtc.toString()}</span>
            <label>String</label>
            <span>{stringJob?.stringName}</span>
            <label>String Type</label>
            <span>{stringJob?.stringType}</span>
            <label>Tension</label>
            <span>{stringJob?.tension} {stringJob?.tensionType}</span>
            <label>Charge Amount</label>
            <span>${stringJob?.chargeAmount}</span>
            <label>Notes</label>
            <span>{stringJob?.notes}</span>
        </main>
    )
}