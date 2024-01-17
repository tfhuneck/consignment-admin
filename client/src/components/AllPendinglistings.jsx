import Pagination from "./Pagination";
import Search from "./Search";
import Sort from "./Sort";
import PendingTable from "./PendingTable";
import Loading from "./Loading";
import { useState, useEffect } from 'react';
import { useSortPay } from "./hooks/useSortPay";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useFetchData } from "./hooks/useFetchData";
import { useParams } from "react-router-dom";

function AllPending() {

    // User ID from Route Params
    const params = useParams();

    // fetch User Data hook
    const {userData} = useFetchData('/allpending');
    
    // Custom Search hook 
    const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(userData);

    // Sorting Table hook
    const {state, handleSortName, handleSortPrice, handleSortPay, handleSortDate}  = useSortPay(filteredData);

    // Pagination Hook that also handles rerenders on search and Sorting table
    const { currentRecords, currentPage, setCurrentPage, nPages } = usePagination(state, userData, filteredData);
    
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
                <Search clearSearch={clearSearch} handleSearch={handleSearch} searchValue={searchValue} searchClass={'listings-search'} clearClass={'clear-search-home'} />
                <table className='table table-dark table-striped table-hover'>
                    <thead>
                        <tr>
                            <th className="list-header" scope='col'>
                                Item
                                <span onClick={handleSortName} >
                                    <Sort sort={state.sortName}/>
                                </span>
                            </th>
                            <th className="list-header" scope='col'>
                                Date
                                <span onClick={handleSortDate} >
                                    <Sort sort={state.sortDate}/>
                                </span>
                            </th>
                            <th className="list-header" scope='col'>
                                Price Sold
                                <span onClick={handleSortPrice} >
                                    <Sort sort={state.sortPrice}/>
                                </span>
                            </th>
                            <th className="list-header" scope='col'>
                                Fees
                            </th>
                            <th className="list-header" scope='col'>
                                Payout
                                <span onClick={handleSortPay} >
                                    <Sort sort={state.sortPay} />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <PendingTable currentRecords={currentRecords} />
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

export default AllPending;