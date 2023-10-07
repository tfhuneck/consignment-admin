import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import axios from 'axios';

export const useFetchUserDataPending = () => {

    const [ userAuth, setUserAuth ]             = useContext(UserContext);
    const serverUrl                             = 'http://localhost:8080'
    const [ userData, setUserData ]             = useState();
    
    useEffect(() => {
        async function fetchData(){
            await axios.get(serverUrl + '/pending',
                {params:{
                        userAuth
                }})
                .then(async res => {
                    console.log(res.data);
                    let data = (res.data)
                    setUserData(data);
                })
                .catch(err => console.log(err));
        }
    fetchData();
    },[]);

    return {userData}
}