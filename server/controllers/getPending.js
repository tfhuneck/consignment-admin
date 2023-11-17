const PendingListings   = require ('../model/Pendingitem');
const User              = require('../model/User');

const getPending = async (req, res) => {

    const userId = req.query.userId;

    try{
        const data = await PendingListings.find();
        const user = await User.findOne({userid: userId}).exec();
        // console.log(user)
        const pendingItems   = user.pendingitems
        console.log(pendingItems)
        const filterListings  =  data.filter((i) => 
                   pendingItems.some(n => n.itemid === i.itemid));
        console.log(filterListings);
        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getPending;