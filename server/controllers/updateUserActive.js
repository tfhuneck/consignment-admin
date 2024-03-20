// const User          = require('../model/User');
const User          = require('../model/UserNew')
const Listing       = require ('../model/Activelisting');

const update = async (req, res, next) => {
    const userId            = req.query.userId
    const getUser           = await User.findOne({userid: userId}).exec();
    const userName          = getUser.name;
    const activeItemSub     = getUser.activeitems;
    const listingData       = await Listing.find();
    const sku               = getUser.skucode;

    const filterActive = listingData.filter((items) => {
        if(items.sku) {
            return items.sku.toLowerCase().includes(sku.toLowerCase());
        }
    })
    const activeListingIds = filterActive.map((i) => {
        return {
            itemid: i.itemid
        };
    })

    try{
        await activeItemSub.remove({});
        await getUser.save();
        await activeItemSub.push({$each: activeListingIds})
        await getUser.save();
    } catch (error) {
        console.log(error) 
    }

    return res.status(200).send(`${userName} Active-Items list updated`);
}

module.exports = update;