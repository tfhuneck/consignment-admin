import { useEffect, useState, useContext } from "react";
import { ListingContext } from "../../App";

export const useListingData = (user, sort, sort2) => {

    const [ listingData, setListingData ]   = useContext(ListingContext);
    const [ userData, setUserData ]         = useState();
    
    useEffect(() => {
        let userFilter = listingData && user ? listingData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(user.toLowerCase());
            }
        }) : null;
        let filtered = listingData ? userFilter.filter((i) => i.status === `${sort}` ) : null
        setUserData(filtered)
        if (sort2){
            let filtered = listingData ? userFilter.filter((i) => i.status === `${sort}` ||  i.status === `${sort2}`) : null
            setUserData(filtered)
        }
    }, [user, sort, listingData])

    return {userData}

}