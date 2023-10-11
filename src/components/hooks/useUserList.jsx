import { useContext, useEffect } from "react";
import { UserContext } from "../../App";

export const useUserList = (userData) => {
    
    const [ displayUser, setDisplayUser ]   = useContext(UserContext);

    // console.log(displayUser);
    
    useEffect(() => {
        userData && !displayUser ? setDisplayUser(userData[0]) : setDisplayUser(displayUser)
    }, [userData]);
    
    useEffect(() => {
        // console.log(displayUser)
        if (userData && displayUser) {
            try {
                const element = document.getElementById(displayUser.userid);
                element.className = "users-list users-list-active";
                const inActive = userData.filter((el) =>{
                    return el.userid !== element.id
                });
                for(let i = 0; i < inActive.length; i++){
                    let div = document.getElementById(inActive[i].userid);
                    div.className = 'users-list'
                };
            } catch {
                console.log('user search active not displayed')
            }
        }
    }, [userData, displayUser, setDisplayUser])

    return {displayUser, setDisplayUser};
}