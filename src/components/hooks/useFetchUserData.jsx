import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchUserData = () => {

    const [ userData, setUserData ]         = useState();
    const serverUrl                         = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;
    // const serverUrl                         = process.env.REACT_APP_production_url
    // const PORT                              = process.env.PORT

    useEffect(() => {
        axios.get('/getusers')
        .then((res) =>{
            console.log('get users results      : ' + res.data)
            const data = res.data;
            setUserData(data);
        })
    },[])

    return { userData };
}