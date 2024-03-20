// const User  = require('../model/User');
const User  = require('../model/UserNew')
const axios = require('axios');

const updateSku = async (req, res) => {

    const serverUrl     = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;
    const userData      = req.body;
    const userId        = userData.userid
    const newSku        = userData.sku

    try {
        let findUser = await User.findOne({userid: userId}).exec()
        await findUser.set({skucode: newSku})
        await findUser.save()
        await axios
        .get(serverUrl + '/updateuser', {
            params: { userData }
        })
        res.send('sku updated')
    } 
    catch(err){
        res.send(err)
    }
}

module.exports = updateSku;