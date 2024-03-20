import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { AuthContext } from "../../App";
import axios from 'axios';

export const useFetchData = (url, userid) => {

    const serverUrl                             = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;
    const [ displayUser, setDisplayUser ]       = useContext(UserContext);
    const [ userAuth ]                          = useContext(AuthContext);
    const [ userData, setUserData ]             = useState();
    const userId                                = userid;

    useEffect(() => {
        async function fetchData(){
            await axios.get(
                serverUrl +
                url,
                {params:{
                    userAuth,
                    userId
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