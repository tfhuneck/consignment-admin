

const CashoutTransactions = () => {

    return (
        <>
            <div className="card home-dash">
                <Link to='/users' className="back">
                    <svg 
                        className="back-svg" 
                        width="16" 
                        height="16" 
                        stroke="currentColor"
                        fill="currentColor" 
                        viewBox="0 0 16 16"
                    >
                        <path  className="back-svg"  fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <span className="back-text">Back</span>
                </Link>
                
            </div>
        </>
    )
}

export default CashoutTransactions;