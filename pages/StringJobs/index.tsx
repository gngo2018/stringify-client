import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as StringJobService from '../../services/StringJobService'
import stringJobStyles from './string_job.module.css'
import HeaderContainer from '../../components/Modules/HeaderContainer'
import { StringJobListItem } from '../../models/StringJobs/StringJobListItem'

export default function StringJobs() {
    const router = useRouter();
    const [stringJobs, setStringJobs] = useState<StringJobListItem[]>();

    const handleCreateButtonClick = () => {
        router.push('/StringJobs/Create')
    }
    useEffect(() => {
        async function GetAllStringJobs() {
            const response = await StringJobService.GetAllStringJobsAsync();
            if (response.status === 200) {
                const jobs = response.data;
                jobs.sort((a, b) => +new Date(b.jobDateTimeUtc) - +new Date(a.jobDateTimeUtc));
                setStringJobs(jobs);
            }
        }
        GetAllStringJobs();
    }, []);
    return (
        <main className={stringJobStyles.container}>
            <HeaderContainer name="Stringing" handleButtonClick={handleCreateButtonClick} />
            <div className={stringJobStyles.table}>
                <div className={stringJobStyles.table_header}>
                    <h4>Date</h4>
                    <h4>Client</h4>
                    <h4>S/N</h4>
                    <h4>Racket</h4>
                </div>
                {stringJobs && (
                    stringJobs.map(sj => {
                        return (
                            <Link href={'/StringJobs/Detail/' + sj.stringJobId} key={sj.stringJobId}>
                                <div className={stringJobStyles.table_row}>
                                    <span>{sj.jobDateTimeUtc.toString()}</span>
                                    <span>{sj.clientFirstName}</span>
                                    <span>{sj.racketSerialNumber}</span>
                                    <span>{sj.racketName}</span>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </main>
    )
}