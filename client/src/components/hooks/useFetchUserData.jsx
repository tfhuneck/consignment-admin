import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchUserData = () => {

    const [ userData, setUserData ]         = useState();
    const serverUrl                         = 'http://localhost:8090' || process.env.REACT_APP_production_url;

    useEffect(() => {
        axios.get(
            serverUrl +
            '/getusers')
        .then((res) =>{
            console.log('get users results      : ' + res.data)
            const data = res.data;
            setUserData(data);
        })
    },[])

    return { userData };
}