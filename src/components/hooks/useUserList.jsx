import { useContext, useEffect } from "react";
import { UserContext } from "../../App";

export const useUserList = (userData) => {
    
    const [ displayUser, setDisplayUser ]   = useContext(UserContext);
    
    useEffect(() => {
        userData ? setDisplayUser(userData[0]) : setDisplayUser('')
    }, [userData]);
    
    useEffect(() => {
        console.log(displayUser)
        if (userData && displayUser) {
            const element = document.getElementById(displayUser.userid);
            element.className = "users-list users-list-active";
            const inActive = userData.filter((el) =>{
                return el.userid !== element.id
            });
            for(let i = 0; i < inActive.length; i++){
                let div = document.getElementById(inActive[i].userid);
                div.className = 'users-list'
            };
        }
    }, [displayUser, setDisplayUser])

    return {displayUser, setDisplayUser};
}