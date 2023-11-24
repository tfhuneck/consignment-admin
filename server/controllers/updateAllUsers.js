require('dotenv').config(); // .env config
const axios         = require('axios');
const serverUrl     = 'http://localhost:8090' || PORT
const PORT          = process.env.PORT || 8090; // Enviroment Port

const updateAllUsers = async (req, res, next) => {
    console.log('updating all users ...')
    let Users = []
    await axios.get(serverUrl + '/getusers')
        .then((res) => Users = res.data)
        .catch((err) => console.log(err))
    // console.log(Users)

    if(Users.length <= 1) {
        let userData = {
            'userid' : Users.userid,
            'sku' : Users.skucode,
        };
        await axios.get(serverUrl + '/updateuser', {
            params: { userData }
        }).then((res) => console.log(Users.name + ' User updated'))
        .catch((err) => console.log(err))
    }else{
        for(let i = 0; i < Users.length; i++){
            let userData = {
                'userid' : Users[i].userid,
                'sku' : Users[i].skucode,
            };
            await axios.get(serverUrl + '/updateuser', {
                params: { userData }
            }).then((res) => console.log(Users[i].name + ' User updated'))
            .catch((err) => console.log(err))
        }
    }
}

const apiCall = () => {
    setInterval(() => 
        setTimeout(() =>  updateAllUsers(), 300000),
        3600000
    )
}

module.exports = apiCall;