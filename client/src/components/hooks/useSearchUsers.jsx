import { useState, useEffect } from "react";

export const useSearchUsers = (data) => {

    const [ searchValue, setSearchValue ]       = useState('');
    const [ filteredData, setFilteredData ]     = useState(data);
    
    useEffect(() => {
        if (searchValue && data) {
            let filtered = data.filter((data) => {
                    return data.name.toString().toLowerCase().includes(searchValue.toLowerCase()) 
                 })
            console.log(searchValue)
            console.log(filtered)
            console.log(filteredData)
            setFilteredData(filtered);
        }else {
        setFilteredData(data)
        };
    },[searchValue, data])

       // clear search input
       const clearSearch = () => {
        setSearchValue('');
    }

    // update search state 
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    return { searchValue, filteredData, clearSearch, handleSearch }
}
