import axios from 'axios';
import { useState, useEffect } from 'react';
import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import payout from './hooks/payout';
import listed from './hooks/listed';

const PendingTable = ({currentRecords}) => {

    return (
        <>
            {currentRecords.map((data, key) => {
            return(
                <tr key={key}>
                    <td id={`main-td-${key}`} className="mobile-main-td">
                        <div className="accordion" id={`accordion-${key}`}>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button 
                                        className="accordion-button collapsed bg-dark" 
                                        type="button" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target={`#flush-collapse${key}`} 
                                        aria-expanded="false" 
                                        aria-controls="flush-collapseOne"
                                    >
                                        {data.title}
                                    </button>
                                </h2>
                                <div id={`flush-collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <div className="card listing-details" id={`listing-detail${key}`}>
                                            <div className='card-header'>
                                                Details
                                            </div>
                                            <div className='card-body container'>
                                                <div className='row details-row'>
                                                    <div className="col listing-header">
                                                        View on
                                                    </div>
                                                    <div className="col listing-body">
                                                        <a href={data.itemurl} target="_blank"><img src={ebayLogo} style={{height:"1.5rem", width:"auto"}} /> </a>
                                                    </div>
                                                </div>
                                                <div className='row details-row'>
                                                    <div className="col listing-header">
                                                        Listed on
                                                    </div>
                                                    <div className="col listing-body">
                                                        {listed(data.starttime)}
                                                    </div>
                                                </div>
                                                <div className='row details-row'>
                                                    <div className="col listing-header">
                                                        Sold on
                                                    </div>
                                                    <div className="col listing-body">
                                                        {listed(data.endtime)}
                                                    </div>
                                                </div>
                                                <div className='row details-row'>
                                                        <div className="col listing-header">
                                                            SKU
                                                        </div>
                                                        <div className="col listing-body">
                                                            {data.sku}
                                                        </div>
                                                    </div>
                                                <div className='row details-row'>
                                                    <div className="col listing-header">
                                                        Status
                                                    </div>
                                                    <div className="col listing-body">
                                                        {data.paymentstatus}
                                                    </div>
                                                </div>
                                                <div className='row details-row'>
                                                    <div className="col listing-header">
                                                        Total Price
                                                    </div>
                                                    <div className="col listing-body num">
                                                        $ {data.finalprice.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className='row details-row'>
                                                    <div className="col listing-header">
                                                        Total Fees
                                                    </div>
                                                    <div className="col listing-body">
                                                    $ {(data.finalprice - payout(data.finalprice)).toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className='row details-row'>
                                                    <div className="col listing-header">
                                                            Total Payout
                                                    </div>
                                                    <div className="col listing-body total">
                                                        $ {payout(data.finalprice)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className={`side-td-${key}`}>
                        <span>
                            {listed(data.endtime)}
                        </span>
                    </td>
                    <td className={`side-td-${key}`}>
                        <span className='time-left'>
                            $ {data.finalprice.toFixed(2)}
                        </span>
                    </td>
                    <td className={`side-td-${key}`}>
                        <span>
                            $ {(data.finalprice - payout(data.finalprice)).toFixed(2)}
                        </span>
                    </td>
                    <td className={`side-td-${key}`}>
                        <span className='price'>
                            $ {payout(data.finalprice)}
                        </span>
                    </td>
                </tr>
            )
            })} 
        </>
    )
}

export default PendingTable;