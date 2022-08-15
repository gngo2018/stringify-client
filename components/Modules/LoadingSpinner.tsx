export default function LoadingSpinner() {
    return (
        <>
        <div className="container">
            <h1>Loading...</h1>
            <div className="loader"></div>
        </div>
            <style jsx>{`
                .container{
                    width: 100%;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                .loader {
                    border: 16px solid #f3f3f3; /* Light grey */
                    border-top: 16px solid var(--primary); /* Blue */
                    border-radius: 50%;
                    width: 120px;
                    height: 120px;
                    animation: spin 2s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </>
    )
}