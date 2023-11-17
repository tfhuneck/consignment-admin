import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import axios from 'axios';

export const useFetchData = (url) => {

    const serverUrl                             = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;
    const [ displayUser, setDisplayUser ]       = useContext(UserContext);
    const [ userData, setUserData ]             = useState();
    const userId                                = displayUser.userid;

    useEffect(() => {
        async function fetchData(){
            await axios.get(url,
                {params:{
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