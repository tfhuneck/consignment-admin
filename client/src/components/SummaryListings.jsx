import Pagination from "./Pagination";
import Sort from "./Sort";
import Search from "./Search";
import Table from './SummaryListingsTable';
import Loading from "./Loading";
import Include from "./Include";
import { useState, useEffect, useContext } from 'react';
import { useSort } from "./hooks/useSortSummary";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useInclude } from "./hooks/useInclude";
import { ListingContext } from "../App";


function Listings(props) {

    const sku = props.sku

    const [ listingData, setListingData ]   = useContext(ListingContext);
    const [ userData, setUserData ] = useState();
    useEffect(() => {

        let filtered = listingData ? listingData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        }) : null;
        setUserData(filtered)
    }, [listingData])

   // Include categories hook
   const {stateInclude, handleAll, handleActive, handlePending, handleSold, handleUnsold, handleCanceled} = useInclude(userData)
    
   // Custom Search hook 
   const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(stateInclude.dataIncluded);

   // Sorting Table hook
   const {state, handleSortName, handleSortPrice } = useSort(filteredData);

   // Pagination Hook that also handles rerenders on search and Sorting table
   const { currentRecords, currentPage, setCurrentPage, nPages } = usePagination(state, userData, filteredData, stateInclude,);

   // Condition to load table with products
   const [ loaded, setLoaded ] = useState(false);

   useEffect(() => {
       if(userData) setLoaded(true)
   }, [userData])

   if(!loaded) {
       return (
           <> 
               <Loading/>
           </>
       )
   }
    else {
        
        return (
            <>
                <Search clearSearch={clearSearch} handleSearch={handleSearch} searchValue={searchValue} searchClass={'listings-search'} clearClass={'clear-search'} />
                <Include  
                    data={userData}
                    state={stateInclude} 
                    handleAll={handleAll}
                    handleActive={handleActive}
                    handlePending={handlePending}
                    handleSold={handleSold}
                    handleUnsold={handleUnsold}
                    handleCanceled={handleCanceled}
                />
                <table className='table table-dark table-striped table-hover'>
                    <thead>
                        <tr>
                            <th className="list-header" scope='col'>
                                Listing
                                <span onClick={handleSortName} >
                                    <Sort sort={state.sortName} />
                                </span>
                            </th>
                            <th className="list-header" scope='col'>
                                Status
                            </th>
                            <th className="list-header" scope='col'>
                                Price
                                <span onClick={handleSortPrice} >
                                    <Sort sort={state.sortPrice} />
                                </span>
                            </th>
                            <th className="list-header" scope='col'>
                                Payout
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Table currentRecords={currentRecords} />
                    </tbody>
                </table>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Listings;