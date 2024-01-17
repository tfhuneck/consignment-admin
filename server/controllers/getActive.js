const Listing      = require ('../model/Activelisting');
const User         = require('../model/User');

const getActive = async (req, res) => {

    const userId = req.query.userId;

    try{
        const data              = await Listing.find();
        const user              = await User.findOne({userid: userId}).exec();
        const activeItems       = user.activeitems 
        const sku               = user.skucode;
        const filterListings    = data.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        // const filterListings  =  data.filter((i) => 
        //            activeItems.some(n => n.itemid === i.itemid));

        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getActive;