import { useState, useEffect } from "react";

export const usePagination = (state, userData, filteredData, stateInclude) => {

    // Pagination 
    const [ currentRecords, setCurrentRecords]  = useState();
    const [ currentPage, setCurrentPage ]       = useState(1); 
    const [ nPages, setNPages ]                 = useState();  
    const [ recordsPerPage ]                    = useState(30);
    const indexOfLastRecord                     = currentPage * recordsPerPage;
    const indexOfFirstRecord                    = indexOfLastRecord - recordsPerPage; 

    useEffect(() => {
        if(state.sorted){
            try{
                let sortedData = state.sorted
                const currentRecord = sortedData.slice(indexOfFirstRecord, indexOfLastRecord); 
                setCurrentRecords(currentRecord) 
                const Page = Math.ceil(sortedData.length / recordsPerPage);
                setNPages(Page)
            } catch(err){
                console.log(err)
            }
        }
    }, [state, state.sorted])

     useEffect(()=>{
        if(filteredData){
            try{
                // console.log(userData);
                const currentRecord = filteredData.slice(indexOfFirstRecord, indexOfLastRecord); 
                setCurrentRecords(currentRecord) 
                const Page = Math.ceil(filteredData.length / recordsPerPage);
                setNPages(Page)
                // console.log(currentRecords);
            } catch(err){
                console.log(err)
            }
        }
    },[userData, filteredData, currentPage])

    return { currentRecords, currentPage, setCurrentPage, nPages };
}