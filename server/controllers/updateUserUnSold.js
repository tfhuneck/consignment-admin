const User          = require('../model/User');
const UnsoldItem      = require('../model/Unsolditem');
  
const update = async (req, res, next) => {
    const userId            = req.query.userId
    const getUser           = await User.findOne({userid: userId}).exec();
    const soldData          = await UnsoldItem.find();
    const userName          = getUser.name;
    const unsoldItemSub     = getUser.unsolditems;
    const sku               = getUser.skucode;

    const filterUnSold =  soldData.filter((items) => {
        if(items.sku) {
            return items.sku.toLowerCase().includes(sku.toLowerCase());
        }
    })

    const unsoldItemIds = filterUnSold.map((i) => {
        return {
            itemid: i.itemid
        };
    })

    try{
        await unsoldItemSub.remove({})
        await getUser.save();
        await unsoldItemSub.push({$each: unsoldItemIds});
        await getUser.save();
    } catch (error) {
        console.log(error) 
    }

    return res.status(200).send(`${userName} UnSold-Items list updated`);
}

module.exports = update;