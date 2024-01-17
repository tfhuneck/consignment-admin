import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import listed from './hooks/listed';
import time from './hooks/time';
import payout from './hooks/payout';

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
                                                    <div className='row details-row'>
                                                        <div className="col listing-header">
                                                            View on ebay
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
                                                            Time Left
                                                        </div>
                                                        <div className="col listing-body">
                                                            {time(data.timeleft)}
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
                                                            Watching
                                                        </div>
                                                        <div className="col listing-body">
                                                            {data.watchcount}
                                                        </div>
                                                    </div>
                                                    <div className='row details-row'>
                                                        <div className="col listing-header">
                                                            Bids
                                                        </div>
                                                        <div className="col listing-body">
                                                            {data.bidcount}
                                                        </div>
                                                    </div>
                                                    <div className='row details-row'>
                                                        <div className="col listing-header">
                                                        Current Price
                                                        </div>
                                                        <div className="col listing-body total">
                                                            $ {data.currentprice.toFixed(2)}
                                                        </div>
                                                    </div>
                                                    <div className='row details-row'>
                                                        <div className="col listing-header">
                                                            Total Fees
                                                        </div>
                                                        <div className="col listing-body">
                                                        $ {(data.currentprice - payout(data.currentprice)).toFixed(2)}
                                                        </div>
                                                    </div>
                                                    <div className='row details-row'>
                                                        <div className="col listing-header">
                                                        Payout
                                                        </div>
                                                        <div className="col listing-body num">
                                                            $ {payout(data.currentprice.toFixed(2))}
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
                            <span className='time-left'>
                                {time(data.timeleft)}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
                            <span >
                                {data.bidcount}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
                            <span className='price'>
                                $ {data.currentprice.toFixed(2)}
                            </span>
                        </td>
                    </tr>
                )
            })} 
        </>
    )
}

export default Table;