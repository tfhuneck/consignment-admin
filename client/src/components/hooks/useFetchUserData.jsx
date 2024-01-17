import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../App";

export const useFetchUserData = () => {

    const [ userData, setUserData ]         = useState();
    const [ userAuth ]                      = useContext(AuthContext);
    const serverUrl                         = 'http://localhost:8090' || process.env.REACT_APP_production_url;

    useEffect(() => {
        axios.get(
            serverUrl +
            '/getusers',
            {params:{
                userAuth
            }})
        .then((res) =>{
            console.log('get users results      : ' + res.data)
            const data = res.data;
            setUserData(data);
        })
    },[])

    return { userData };
}