import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import axios from 'axios';

export const useFetchDataGeneral = (url, trigger) => {

    const serverUrl                     = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;
    const [ data, setData ]             = useState();

    useEffect(() => {
        async function fetchData(){
            await axios.get(
                serverUrl +
                url,
                )
                .then(async res => {
                    console.log(res.data);
                    let data = (res.data)
                    setData(data);
                })
                .catch(err => console.log(err));
        }
    fetchData();
    },[trigger]);

    return {data}
}