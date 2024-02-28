import { useDisplayList } from "./hooks/useDisplayList";
import AllActive from "./AllActivelistings";
import AllPending from "./AllPendinglistings";
import AllSold from "./AllSoldlistings";
import AllUnsold from "./AllUnsoldlistings";
import AllSummary from './AllSummaryListings'

const AllListings = () => {

    // Set Button active and display correct List hook
    const { displayList, setDisplayList }   = useDisplayList();

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <h4>All Listing Data</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <button id="dashListActive" className="dash-list" onClick={()=> setDisplayList('activeListings')}>Active Listings</button>
                        <button id="dashListPending" className="dash-list" onClick={()=> setDisplayList('pendingListings')}>Pending</button>
                        <button id="dashListSold" className="dash-list" onClick={()=> setDisplayList('soldListings')}>Sold Items</button>
                        <button id="dashListUnsold" className="dash-list" onClick={()=> setDisplayList('unsoldListings')}>Unsold</button>
                        <button id="dashListSummary" className="dash-list" onClick={()=> setDisplayList('summaryListings')}>Summary</button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                { displayList === 'activeListings' &&  <AllActive /> }
                { displayList === 'pendingListings' &&  <AllPending /> }
                { displayList === 'soldListings' &&  <AllSold /> }
                { displayList === 'unsoldListings' && <AllUnsold /> }
                { displayList === 'summaryListings' && <AllSummary /> }
            </div>

        </>
    )
}

export default AllListings;