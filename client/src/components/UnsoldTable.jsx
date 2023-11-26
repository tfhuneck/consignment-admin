import axios from 'axios';
import { useState, useEffect } from 'react';
import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import payout from './hooks/payout';
import listed from './hooks/listed';

const UnsoldTable = ({currentRecords}) => {

    const serverUrl = 'http://localhost:8080';

    return (
        <>
            {currentRecords.map((data, key) => {
                return(
                    <tr key={key}>
                        <td>
                            <div className="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button 
                                            className="accordion-button collapsed bg-dark" 
                                            type="button" 
                                            data-bs-toggle="collapse" 
                                            data-bs-target={`#flush-collapse${key}`} 
                                            aria-expanded="false" 
                                            aria-controls="flush-collapseOne"
                                            // onClick={() => setLoad(data.itemurl)}
                                        >
                                            {data.title}
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <div className='row'>
                                                        <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                        <div className="card-header listing-header">
                                                                            View on
                                                                        </div>
                                                                        <div className="card-body listing-body">
                                                                            <a href={data.itemurl} target="_blank"><img src={ebayLogo} style={{height:"1.5rem", width:"auto"}} /> </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Listed on
                                                                    </div>
                                                                    <div className="card-body listing-body text-body-secondary">
                                                                        {listed(data.starttime)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Sold on:
                                                                    </div>
                                                                    <div className="card-body listing-body text-body-secondary">
                                                                        {listed(data.endtime)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Status:
                                                                    </div>
                                                                    <div className="card-body listing-body text-body-secondary">
                                                                        {data.paymentstatus}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Total Price:
                                                                    </div>
                                                                    <div className="card-body listing-body text-body-secondary">
                                                                        {data.price.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Total Payout:
                                                                    </div>
                                                                    <div className="card-body listing-body text-body-secondary">
                                                                        {payout(data.price)}
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        {/* <td>
                            <span className='time-left'>
                                $ {data.price.toFixed(2)}
                            </span>
                        </td>
                        <td>
                            <span className='price'>
                                $ {payout(data.price)}
                            </span>
                        </td> */}
                    </tr>
                )
            })} 
        </>
    )
};

export default UnsoldTable;