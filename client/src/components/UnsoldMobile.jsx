import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import listed from './hooks/listed';
import time from './hooks/time'
import payout from './hooks/payout';
import Status from "./Status";

const TableMobile = ({currentRecords}) => {

    return (
        <>
            {currentRecords.map((data, key) => {
                return(
                    <tr key={key}>
                        <td>
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
                                        <div className="accordion-body container listing-container-mobile">
                                            <div className='row d-flex justify-content-center'>
                                                <div className="card listing-details-mobile" id={`listing-detail${key}`}>
                                                    <div className='card-header'>
                                                        Details
                                                    </div>
                                                    <div className='card-body container'>
                                                        {data.itemurl ?
                                                            <div className='row details-row'>
                                                                <div className="col listing-header">
                                                                    View on ebay
                                                                </div>
                                                                <div className="col listing-body">
                                                                    <a href={data.itemurl} target="_blank"><img src={ebayLogo} style={{height:"1.5rem", width:"auto"}} /> </a>
                                                                </div>
                                                            </div> 
                                                            : null
                                                        }
                                                        {data.starttime ? 
                                                            <div className='row details-row'>
                                                                <div className="col listing-header">
                                                                    Listed on
                                                                </div>
                                                                <div className="col listing-body">
                                                                    {data.starttime && listed(data.starttime)}
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                        {data.endtime ?
                                                            <div className='row details-row'>
                                                                <div className="col listing-header">
                                                                    Ended on
                                                                </div>
                                                                <div className="col listing-body">
                                                                    {listed(data.endtime)}
                                                                </div>
                                                            </div>
                                                            :null
                                                        }
                                                        {data.sku ?
                                                            <div className='row details-row'>
                                                                <div className="col listing-header">
                                                                    SKU
                                                                </div>
                                                                <div className="col listing-body">
                                                                    {data.sku}
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                        {data.watchcount ?
                                                            <div className='row details-row'>
                                                                <div className="col listing-header">
                                                                    Watching
                                                                </div>
                                                                <div className="col listing-body">
                                                                    {data.watchcount}
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                        {data.bidcount ?
                                                            <div className='row details-row'>
                                                                <div className="col listing-header">
                                                                    Bids
                                                                </div>
                                                                <div className="col listing-body">
                                                                    {data.bidcount}
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                        {data.currentprice ? 
                                                            <>
                                                                <div className='row details-row'>
                                                                    <div className="col listing-header">
                                                                        Auction Price
                                                                    </div>
                                                                    <div className="col listing-body total">
                                                                        $ {data.currentprice.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                        {data.currentprice ? 
                                                            <>
                                                                <div className='row details-row'>
                                                                    <div className="col listing-header">
                                                                        (Auction) Fees
                                                                    </div>
                                                                    <div className="col listing-body">
                                                                    $ 0
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                        {data.currentprice ? 
                                                            <>
                                                                <div className='row details-row'>
                                                                    <div className="col listing-header">
                                                                    (Auction) Payout
                                                                    </div>
                                                                    <div className="col listing-body num">
                                                                        $ 0
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                        {data.paymentstatus ? 
                                                            <>
                                                                <div className='row details-row'>
                                                                    <div className="col listing-header">
                                                                        Payment Status
                                                                    </div>
                                                                    <div className="col listing-body">
                                                                        {data.paymentstatus}
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                        {data.paymentstatus ? 
                                                            <>
                                                                <div className='row details-row'>
                                                                    <div className="col listing-header">
                                                                        Final Price
                                                                    </div>
                                                                    <div className="col listing-body num">
                                                                        $ {data.finalprice.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                        {data.paymentstatus ? 
                                                            <>
                                                                <div className='row details-row'>
                                                                    <div className="col listing-header">
                                                                        Final Fees
                                                                    </div>
                                                                    <div className="col listing-body">
                                                                    $ 0
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                        {data.paymentstatus ? 
                                                            <>
                                                                <div className='row details-row'>
                                                                    <div className="col listing-header">
                                                                        Final Payout
                                                                    </div>
                                                                    <div className="col listing-body total">
                                                                        $ 0
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                        {data.canceldate ?
                                                            <div className='row details-row'>
                                                                <div className="col listing-header">
                                                                    Cancel Date
                                                                </div>
                                                                <div className="col listing-body">
                                                                    {listed(data.canceldate)}
                                                                </div>
                                                            </div>
                                                            :null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <Status stat={data.status} />                     
                                    </div>
                                    <div className="col">
                                        Date
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">                    
                                    </div>
                                    <div className="col">
                                        <span>
                                        {data.endtime && data.status === 'unsold' ? listed(data.endtime) : data.canceldate && data.status === 'canceled' ? listed(data.canceldate) : null}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            })} 
        </>
    ) 
}

export default TableMobile;