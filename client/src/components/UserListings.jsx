import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import { useDisplayList } from "./hooks/useDisplayList";
import { useFetchData } from "./hooks/useFetchData";
import Listings from './Activelistings';
import Sold from "./Soldlistings";
import Pending from './Pendinglistings'
import Unsold from "./Unsoldlistings";
import Summary from './SummaryListings'

const UserListings = () => {

    // User ID from Route Params
    const params = useParams();

    // get User
    const {userData} = useFetchData('/getuser', params.userid);

    // User Context
    const [ displayUser, setDisplayUser ]   = useContext(UserContext);

    // Set Button active and display correct List hook
    const { displayList, setDisplayList }   = useDisplayList();

    const navigate                          = useNavigate();

    useEffect(() => {
        if(!displayUser) setDisplayUser(userData);
    })

    return (
        <>
            <div className="card home-dash">
                <div className="container container-home">
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
                </div>
                <br />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <h4>{displayUser && displayUser.name}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <button id="dashListActive" className="dash-list" onClick={()=> setDisplayList('activeListings')}>Active Listings</button>
                            <button id="dashListPending" className="dash-list" onClick={()=> setDisplayList('pendingListings')}>Pending</button>
                            <button id="dashListSold" className="dash-list" onClick={()=> setDisplayList('soldListings')}>Sold Items</button>
                            <button id="dashListUnsold" className="dash-list" onClick={()=> setDisplayList('unsoldListings')}>Unsold</button>
                            <button id="dashListSummary" className="dash-list" onClick={()=> setDisplayList('summaryListings')}>Summary</button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    { displayList === 'activeListings' && <Listings sku={displayUser && displayUser.skucode} /> }
                    { displayList === 'pendingListings' && <Pending sku={displayUser && displayUser.skucode} />  }
                    { displayList === 'soldListings' && <Sold sku={displayUser && displayUser.skucode} />  }
                    { displayList === 'unsoldListings' && <Unsold sku={displayUser && displayUser.skucode} />  }
                    { displayList === 'summaryListings' && <Summary sku={displayUser && displayUser.skucode} />  }
                </div>
            </div>
        </>
    )
}

export default UserListings;