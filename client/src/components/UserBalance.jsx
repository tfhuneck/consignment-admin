import totalBalance from "./hooks/totalBalance";
import listed from './hooks/listed'
import totalPayout from "./hooks/totalPayout";
import totalCashouts from "./hooks/totalCashouts";
import { Link } from "react-router-dom";

const UserBalance = (props) => {

    const displayUser = props.displayUser

    const totalFees = () => {
        if(displayUser){
            let result = totalBalance(displayUser) - totalPayout(displayUser);
            return result;
        }
    }

    console.log(displayUser);

    return (
        <>
        <div className="user-display-info">
            <div className="row">
                <div className="col balance">
                    Current Balance:
                </div>
                <div className="col balance">
                    $ {displayUser.currentbalance.toFixed(2)}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Cards Sold Total:
                </div>
                <div className="col">
                    $ {totalBalance(displayUser).toFixed(2)}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Payouts Total:
                </div>
                <div className="col">
                    $ {totalPayout(displayUser).toFixed(2)}
                </div>
            </div>
            <div className="row">
                <div className="col withdraw">
                    Total Fees Collected:
                </div>
                <div className="col withdraw">
                    $ {totalFees().toFixed(2)}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Total Cashouts:
                </div>
                <div className="col">
                    $ {totalCashouts(displayUser).toFixed(2)}
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Link to={`/transactions/${displayUser.userid}`} >
                        <button className="btn btn-users-action">Manage Cashout Transactions</button>   
                    </Link>
                </div>
                <div className="col">
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm order-2 order-sm-1">
                Sales Transctions
                <div className="user-display-info">
                    {displayUser && displayUser.balance.map((i) => {
                        return(
                            <>
                                <div className="transactions">
                                    <div className="row">
                                        <div className="col transactions-title">
                                            {i.title}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Date: 
                                        </div>
                                        <div className="col">
                                            {listed(i.date)}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Price Total
                                        </div>
                                        <div className="col">
                                            Payout Total
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            $ {i.price.toFixed(2)}  
                                        </div>
                                        <div className="col">
                                            $ {i.payout.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="col-sm order-1 ">
                Cashout Transactions
                <div className="user-display-info">
                {displayUser && displayUser.cashouts.map((i) => {
                        return(
                            <>
                                <div className="transactions">
                                    <div className="row">
                                        <div className="col">
                                            Type:
                                        </div>
                                        <div className="col">
                                            {i.type}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Amount: 
                                        </div>
                                        <div className="col withdraw">
                                            $ {i.amount.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Date:
                                        </div>
                                        <div className="col">
                                            {i.date}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Comment:
                                        </div>
                                        <div className="col">
                                            {i.comment}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default UserBalance;