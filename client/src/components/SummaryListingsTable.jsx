import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import listed from './hooks/listed';
import time from './hooks/time';
import payout from './hooks/payout';
import Status from "./Status";




const Table = ({currentRecords}) => {

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
                                                    {data.status === 'active' ? 
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                Time Left
                                                            </div>
                                                            <div className="col listing-body">
                                                                {data.timeleft && time(data.timeleft)}
                                                            </div>
                                                        </div>
                                                        : null
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
                                                                $ {data.status === 'unsold' || data.status === 'canceled' ? '0.00' : (data.currentprice - payout(data.currentprice)).toFixed(2)}
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
                                                                    $ {data.status === 'unsold' || data.status === 'canceled' ? '0.00' : payout(data.currentprice.toFixed(2))}
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
                                                                $ {data.status === 'unsold' || data.status === 'canceled' ? '0.00' : (data.finalprice - payout(data.finalprice)).toFixed(2)}
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
                                                                    $ {data.status === 'unsold' || data.status === 'canceled' ? '0.00' : payout(data.finalprice)}
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
                        </td>
                        <td className={`side-td-${key}`}>
                            <Status stat={data.status} /> 
                        </td>
                        <td className={`side-td-${key}`}>
                            <span className='time-left'>
                                $ {data.status === 'active' ? data.currentprice.toFixed(2) : data.status === 'unsold' ? '0.00'  : data.finalprice.toFixed(2)}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
                            <span className='price'>
                                $ {data.status === 'unsold' ? '0.00' : data.status === 'canceled' ? '0.00' : data.status === 'active' ? payout(data.currentprice.toFixed(2)) : payout(data.finalprice.toFixed(2))}
                            </span>
                        </td>
                    </tr>
                )
            })} 
        </>
    )
}

export default Table;