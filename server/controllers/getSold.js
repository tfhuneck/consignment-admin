const SoldListings  = require ('../model/Solditem');
const User          = require('../model/User');

const getSold = async (req, res) => {

    const userId = req.query.userId;

    try{
        const data              = await SoldListings.find();
        const user              = await User.findOne({userid: userId}).exec();
        const sku               = user.skucode;
        const soldItems         = user.solditems 
        const filterListings    = data.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        // const filterListings  =  data.filter((i) => 
        //            soldItems.some(n => n.itemid === i.itemid));
        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getSold;