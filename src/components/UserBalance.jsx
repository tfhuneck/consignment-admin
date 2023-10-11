import totalBalance from "./hooks/totalBalance";

const UserBalance = (props) => {

    const displayUser = props.displayUser

    console.log(displayUser);

    return (
        <>
        <div className="user-display-info">
            <div className="row">
                <div className="col">
                    Current Balance:
                </div>
                <div className="col">
                    $ {totalBalance(displayUser)}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Cards Sold Total:
                </div>
                <div className="col">
                    $ {totalBalance(displayUser)}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Payouts Total:
                </div>
                <div className="col">
                    $ {totalBalance(displayUser)}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Total Fees Collected:
                </div>
                <div className="col">
                    $
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                Sale Transctions
                <div className="user-display-info">
                    
                </div>
            </div>
            <div className="col">
                Cashout Transactions
                <div className="user-display-info">

                </div>
            </div>
        </div>
        </>
    )
}

export default UserBalance;