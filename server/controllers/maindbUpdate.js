const axios = require('axios');

const runUpdateFlow = async () => {
    const serverUrl     = 'http://localhost:8090' || PORT

    console.log('***************** Calling new data update flow *****************')
    
    //  call active data and updates
    await axios.get(serverUrl + '/activenew')
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    // call pending updates
    await axios.get(serverUrl + '/pendingnew')
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    // call sold updates
    await axios.get(serverUrl + '/soldnew')
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    // call unsold updates 
    await axios.get(serverUrl + '/unsoldnew')
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

    // call canceled updates
    await axios.get(serverUrl + '/canceled')
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    console.log('********************* new main data update flow complete ************************')
}

module.exports = runUpdateFlow;