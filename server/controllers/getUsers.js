const User  = require('../model/User');

const getUsers = async (req, res) => {
    
    try{
        const data = await User.find()
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}

module.exports = getUsers;
