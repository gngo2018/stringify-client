import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../../contexts/AuthContext'
import { StringJobDetailItem } from '../../../models/StringJobs/StringJobDetailItem'
import * as StringJobService from '../../../services/StringJobService'
import detailStyles from './detail.module.css'

export default function StringJobDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { isAdmin } = useAuthContext();
    const [stringJob, setStringJob] = useState<StringJobDetailItem>()

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
                }
            }
        }

        GetStringJobDetail();
    }, [id]);
    return (
        <main className={detailStyles.detail_container}>
            <h2>Job Detail - {stringJob?.clientFirstName}</h2>
            {isAdmin && (
                <div className={detailStyles.button_container}>
                    <Link href={'/StringJobs/Update/' + stringJob?.stringJobId}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
            )}
            <label>Date Requested</label>
            <span>{stringJob?.jobDateTimeUtc.toString()}</span>
            <label>Racket</label>
            <span>{stringJob?.racketName}</span>
            <label>Serial Number</label>
            <span>{stringJob?.racketSerialNumber}</span>
            <label>String</label>
            <span>{stringJob?.stringName}</span>
            <label>String Type</label>
            <span>{stringJob?.stringType}</span>
            <label>Tension</label>
            <span>{stringJob?.tension} {stringJob?.tensionType}</span>
            {isAdmin && (
                <>
                    <label>Charge Amount</label>
                    <span>${stringJob?.chargeAmount}</span>
                    <label>Notes</label>
                    <span>{stringJob?.notes}</span>
                </>
            )}
        </main>
    )
}