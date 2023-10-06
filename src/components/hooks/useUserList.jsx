import { useState, useEffect } from "react";

export const useUserList = (userData) => {

    const [ displayUser, setDisplayUser ]   = useState();

    useEffect(() => {
        userData ? setDisplayUser(userData[0]) : setDisplayUser('')
    }, [userData]);

    return {displayUser, setDisplayUser};
}