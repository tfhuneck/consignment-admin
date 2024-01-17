const UnsoldListings    = require ('../model/Unsolditem');
const User              = require('../model/User');

const getUnsold = async (req, res) => {

    const userId = req.query.userId;

    try{
        const data              = await UnsoldListings.find();
        const user              = await User.findOne({userid: userId}).exec();
        const unsoldItems       = user.unsolditems 
        const sku               = user.skucode;
        const filterListings    = data.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        // const filterListings  =  data.filter((i) => 
        //            unsoldItems.some(n => n.itemid === i.itemid));
        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getUnsold;