const PendingListings   = require ('../model/Pendingitem');
const User              = require('../model/User');

const getPending = async (req, res) => {

    const userId = req.query.userId;

    try{
        const data              = await PendingListings.find();
        const user              = await User.findOne({userid: userId}).exec();
        const pendingItems      = user.pendingitems
        const sku               = user.skucode;
        const filterListings    = data.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        // const filterListings  =  data.filter((i) => 
        //            pendingItems.some(n => n.itemid === i.itemid));
        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getPending;