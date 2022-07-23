import { useAuthContext } from '../../contexts/AuthContext'

interface HeaderContainerProps {
    name: string,
    handleButtonClick: () => void
}

export default function HeaderContainer(props: HeaderContainerProps) {
    const { isAdmin } = useAuthContext();

    return (
        <div className="container">
            <h2>{props.name} List Page</h2>
            {isAdmin && (
                <button onClick={props.handleButtonClick}>Create</button>
            )}
            <style>{`
                .container {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }
            `}</style>
        </div>


    )
}