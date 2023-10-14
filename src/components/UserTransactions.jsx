import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import axios from "axios";

const CashoutTransactions = () => {

    // User Context
    const serverUrl                                     = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;
    const [ displayUser, setDisplayUser ]               = useContext(UserContext);
    const [ transactionResult, SetTransactionResult ]   = useState('')
    const transaction = {
        date: '',
        type: 'break credit',
        amount: null,
        comment: ''
    };

    const submitTransaction = () => {
        const date      = document.getElementById('date');
        const type      = document.getElementById('type');
        const amount    = document.getElementById('amount');
        const comment   = document.getElementById('comment');
        console.log(transaction)
        
        if(displayUser && transaction.amount){
            axios.post(serverUrl + '/addcashout', {
                displayUser,
                transaction
            })
            .then(res => {
                console.log('transaction added')
                date.value = '';
                type.value = 'break credit';
                amount.value = '';
                comment.value ='';
                SetTransactionResult('Success, Transaction has been added')
            })
            .catch(err => {
                console.log(err);
                SetTransactionResult('An error has occured')
            });
        }
    }

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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <h4>{displayUser && displayUser.name}</h4>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            Add Cashout Transaction
                            <br /><br />
                            <div className="transaction-container">
                                <label htmlFor="date">Transaction Date</label>
                                <div>
                                    <input type="date" name="date" id="date" className="form-control" onChange={(e) => transaction.date = e.target.value}/>
                                </div>
                                <label htmlFor="type">Transaction Type</label>
                                <div>
                                    <select type="form-select drop-form" name="type" id="type" className="form-select" onChange={(e) => transaction.type = e.target.value}>
                                        <option value={'break credit'}>Break Credit</option>
                                        <option value={'paypal'}>Paypal</option>
                                        <option value={'cashapp'}>Cashapp</option>
                                        <option value={'venmo'}>Venmo</option>
                                        <option value={'bank transfer'}>Bank Transfer</option>
                                    </select>
                                </div>
                                <label htmlFor="amount">Transaction Amount</label>
                                <div>
                                    <input type="number" name="amount" id="amount" placeholder="Enter Cashout Amount" className="form-control" onChange={(e) => transaction.amount = e.target.value}/>
                                </div>
                                <label htmlFor="comment">Comment</label>
                                <div>
                                    <input type="text" name="comment" id="comment" placeholder="Transaction Comments" className="form-control" onChange={(e) => transaction.comment = e.target.value}/>
                                </div>
                                <br /> 
                                <div>
                                    {transactionResult}
                                </div>
                                <br />
                                <div>
                                    <button className="btn btn-users-action" onClick={submitTransaction}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
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
                                                <div className="col">
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
                </div>
            </div>
        </>
    )
}

export default CashoutTransactions;