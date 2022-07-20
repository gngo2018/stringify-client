import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { StringJob } from '../../models/StringJobs/StringJob'
import * as StringJobService from '../../services/StringJobService'
import stringJobStyles from './string_job.module.css'

export default function StringJobs() {
    const router = useRouter();
    const [stringJobs, setStringJobs] = useState<StringJob[]>();
    const [userRole, setUserRole] = useState<string>();

    useEffect(() => {
        async function GetAllStringJobs(){
            const response = await StringJobService.GetAllStringJobsAsync();
            if (response.status === 200){
                const jobs = response.data;
                jobs.sort((a,b) => +new Date(b.jobDateTimeUtc) - +new Date(a.jobDateTimeUtc) );
                setStringJobs(jobs);
            }
        }
        const userRole = localStorage.getItem('userRole');
        if(userRole){
            setUserRole(userRole);
        }
        GetAllStringJobs();
    }, []);
    return(
        <main className={stringJobStyles.container}>
            <div className={stringJobStyles.header_container}>
                <h2>Stringing List Page</h2>
                {userRole === 'admin' && (
                    <Link href='/StringJobs/Create'>
                        <button>Create</button>
                    </Link>
                )}
            </div>
            <div className={stringJobStyles.table}>
                <div className={stringJobStyles.table_header}>
                    <h4>Date</h4>
                    <h4>Client</h4>
                    <h4>Racket</h4>
                </div>
                {stringJobs && (
                    stringJobs.map(sj => {
                        return (
                            <Link href={'/StringJobs/Detail/' + sj.id} key={sj.id}>
                                <div className={stringJobStyles.table_row}>
                                    <span>{sj.jobDateTimeUtc.toString()}</span>
                                    <span>{sj.clientName}</span>
                                    <span>{sj.racket}</span>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </main>
    )
}