import { useFetchDataGeneral } from "./hooks/useFetchDataGeneral";
import { useState, useEffect } from "react";
import axios from "axios";

const NoRequests = (data) => {
    if(data.data && data.data.length === 0){
        console.log('nodata')
        return(
            <>
                <h6>
                    No Cashout Requests currently
                </h6>
            </>
        )
    }
}

const CashoutRequests = () => {

    const [ request, setRequest ]       = useState();
    const data                          = useFetchDataGeneral('/request', request);
    const requests                      = data.data;
    const serverUrl                     = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;

    useEffect(() => {
    })

    const viewRequest = async (userId, cashoutReq) =>{
        let userData = {}
        await axios.get(
            serverUrl +
            '/getUser',
            {params: {userId}}
        ) .then((res) => {  
            userData = res.data
        }).catch((err) => console.log(err))
        let displayRequest = {
            userData,
            cashoutReq
        }
        await setRequest(displayRequest);
        console.log(request);
    }

    const confirmRequest = async (displayUser, date, type, amount, comment, requestId) => {

        const transaction = {
            date: date,
            type: type,
            amount: amount,
            comment: comment
        };
        await axios.post(
            serverUrl + 
            '/addcashout', {
            displayUser,
            transaction
        })
        .then(res => {
            console.log('Cashout added to user');
            cancelRequest(requestId);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const cancelRequest = async (requestId) => {
        await axios.put(
            serverUrl +
            '/request',
            {params:{
                requestId
        }})
        .then(res => {
            console.log(res.data);
            setRequest();
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <div className="card home-dash">
                <div className="container">
                   <div className="row">
                        <div className="col">
                            <h4 className="header">Cashout Requests</h4>
                            <div className="requests-box">
                                <NoRequests data={requests}/>
                                {requests && requests.map((i, key) => {
                                    return(
                                        <>
                                           <div 
                                                className="users-list" 
                                                id={`${i._id}`} 
                                                key={key} 
                                                onClick={()=> viewRequest(i.userid, i)}
                                            >
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col">
                                                            <span className="users-list-name">
                                                                {i.date}
                                                            </span>
                                                        </div>
                                                        <div className="col">
                                                            <span className="users-list-name" >
                                                                {i.name} 
                                                            </span> <br />
                                                            <span className="users-list-name" >
                                                                sku: {i.skucode}
                                                            </span>
                                                        </div>
                                                        <div className="col">
                                                            <div className="users-list-name">
                                                               {i.type}
                                                            </div>
                                                            <span className="users-list-name withdraw">
                                                               $ {Number(i.amount).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div> 
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col">
                            {request && 
                                <>
                                    <div className="request-display">
                                        <div className="container">
                                            <h6>
                                                Cashout Request
                                            </h6>
                                            <div className="row"> 
                                                <div className="col request-display-key">
                                                    User:
                                                </div>
                                                <div className="col request-display-value">
                                                    <div>{request.userData.name}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col request-display-key">
                                                    sku: 
                                                </div>
                                                <div className="col request-display-value">
                                                    <div>{request.userData.skucode}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col request-display-key">
                                                    Current Balance: 
                                                </div>
                                                <div className="col request-display-value balance">
                                                    <div>${request.userData.currentbalance}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col request-display-key">
                                                Cashout Request Date:
                                            </div>
                                                <div className="col request-display-value">
                                                    <div> {request.cashoutReq.date}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col request-display-key">
                                                Cashout Type
                                            </div>
                                                <div className="col request-display-value">
                                                    <div>{request.cashoutReq.type}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col request-display-key">
                                                Cashout Amount:
                                            </div>
                                                <div className="col request-display-value withdraw">
                                                    <div>${Number(request.cashoutReq.amount).toFixed(2)}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col request-display-key">
                                                Comment:
                                            </div>
                                                <div className="col request-display-value">
                                                    <div>{request.cashoutReq.comment}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="request-display-buttons">
                                            <button 
                                                className="btn btn-outline-success request-button"
                                                onClick={() => confirmRequest(request.userData, request.cashoutReq.date, request.cashoutReq.type, request.cashoutReq.amount, request.cashoutReq.comment, request.cashoutReq._id)}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"  viewBox="0 0 16 16">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                            </svg> &nbsp;
                                                Confirm
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger request-button"
                                                onClick={() => cancelRequest(request.cashoutReq._id)}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"  viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg> &nbsp;
                                                Cancel
                                            </button>
                                        </div>  
                                    </div>
                                </>
                            }
                        </div>
                   </div>
                </div>
            </div>
        </>
    )
}

export default CashoutRequests; 