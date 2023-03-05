import { useState } from 'react'
import tabStyles from './tab.module.css'

export type TabNavProps = {
    setActivePanel: (panelName: string) => void
}

export default function TabNav(props: TabNavProps) {
    const [historyIsActive, setHistoryIsActive] = useState(true);
    const [racketsIsActive, setRacketsIsActive] = useState(false);
    const [futureJobsIsActive, setFutureJobsIsActive] = useState(false);
    const [infoIsActive, setInfoIsActive] = useState(false);

    const handleTabNavOnClick = (id: string) => {
        setHistoryIsActive(false);
        setRacketsIsActive(false);
        setFutureJobsIsActive(false);
        setInfoIsActive(false);

        if(id.toUpperCase() === 'HISTORY'){
            setHistoryIsActive(true);
            props.setActivePanel('History');
        }
        else if(id.toUpperCase() === 'RACKETS'){
            setRacketsIsActive(true);
            props.setActivePanel('Rackets');
        }
        else if(id.toUpperCase() === 'FUTUREJOBS'){
            setFutureJobsIsActive(true);
            props.setActivePanel('FutureJobs');
        }
        else if(id.toUpperCase() === 'INFO'){
            setInfoIsActive(true);
            props.setActivePanel('Info')
        }
    }
    
    return (
        <section className={tabStyles.flex_container}>
            <div className={`${tabStyles.circle_container} ${historyIsActive ? tabStyles.active : ''}`}>
                <span onClick={() => handleTabNavOnClick('History')}></span>
                <p>History</p>
            </div>
            <div className={`${tabStyles.circle_container} ${racketsIsActive ? tabStyles.active : ''}`}>
                <span onClick={() => handleTabNavOnClick('Rackets')}></span>
                <p>Rackets</p>
            </div>
            <div className={`${tabStyles.circle_container} ${futureJobsIsActive ? tabStyles.active : ''}`}>
                <span onClick={() => handleTabNavOnClick('FutureJobs')}></span>
                <p>Future Jobs</p>
            </div>
            <div className={`${tabStyles.circle_container} ${infoIsActive ? tabStyles.active : ''}`}>
                <span onClick={() => handleTabNavOnClick('Info')}></span>
                <p>Info</p>
            </div>
        </section>

    )
}