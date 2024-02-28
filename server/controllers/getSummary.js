const Listing      = require ('../model/AllItem');
const User         = require('../model/User');

const getSummary = async (req, res) => {
    
    const userId = req.query.userId;

    try{
        const data              = await Listing.find();
        const user              = await User.findOne({userid: userId}).exec();
        const sku               = user.skucode;
        const filterListings    = data.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })

        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getSummary;