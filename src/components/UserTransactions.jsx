import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import { useDisplayList } from "./hooks/useDisplayList";

const CashoutTransactions = () => {

    // User Context
    const [ displayUser, setDisplayUser ]   = useContext(UserContext);


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
                            <h6>Add Cashout Transaction</h6>
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                        </div>
                        <div className="col">
                            transations go here 
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CashoutTransactions;