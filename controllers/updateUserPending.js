const User          = require('../model/User');
const PendingItem   = require('../model/Pendingitem');

const update = async (req, res, next) => {
    const userId            = req.query.userId
    const getUser           = await User.findOne({userid: userId}).exec();
    const userName          = getUser.name;
    const pendingItemSub    = getUser.pendingitems;
    const pendingData       = await PendingItem.find();
    const sku               = getUser.skucode;

    const filterPending =  pendingData.filter((items) => {
        if(items.sku) {
            return items.sku.toLowerCase().includes(sku.toLowerCase());
        }
    })

    const pendingItemIds = filterPending.map((i) => {
        return {
            itemid: i.itemid
        };
    })

    try{
        await pendingItemSub.remove({})
        await getUser.save();
        await pendingItemSub.push({$each: pendingItemIds});
        await getUser.save();
    } catch (error) {
        console.log(error) 
    }

    return res.status(200).send(`${userName} Pending-Items list updated`);
}

module.exports = update;