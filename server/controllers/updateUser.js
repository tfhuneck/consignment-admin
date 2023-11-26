require('dotenv').config(); // .env config
const axios         = require('axios');
const serverUrl     = 'http://localhost:8090' || PORT
const PORT          = process.env.PORT || 8090; // Enviroment Port

const updateUser = async (req, res, next) => {
    const userId            = req.query.userData.userid;

    const updateActiveItems = async () => {
        await axios.get(serverUrl + '/updateuseractive', {
            params: { userId }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }

    const updateSoldItems = async () => {
        await axios.get(serverUrl + '/updateusersold', {
            params: { userId }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }

    const updatePendigItems = async () => {  
        await axios.get(serverUrl + '/updateuserpending', {
            params: { userId }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }

    const updateUnSoldItems = async () => {  
        await axios.get(serverUrl + '/updateuserunsold', {
            params: { userId }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }

    const updateUserBalance = async () => {
        await axios.get(serverUrl + '/updateuserbalance', {
            params: { userId }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
       
    }

    const updateCurrentBalance = async () => {
        await axios.get(serverUrl + '/updateusercurrentbalance', {
            params: { userId }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
   
    await updateActiveItems();
    await updateSoldItems();
    await updatePendigItems();
    await updateUnSoldItems();
    await updateUserBalance();
    await updateCurrentBalance();

    return res.status(200).send('user updated');
}

module.exports = updateUser;