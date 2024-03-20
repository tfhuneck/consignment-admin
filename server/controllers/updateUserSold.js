// const User          = require('../model/User');
const User          = require('../model/UserNew')
const SoldItem      = require('../model/Solditem');
  
const update = async (req, res, next) => {
    const userId            = req.query.userId
    const getUser           = await User.findOne({userid: userId}).exec();
    const soldData          = await SoldItem.find();
    const userName          = getUser.name;
    const soldItemSub       = getUser.solditems;
    const sku               = getUser.skucode;

    const filterSold =  soldData.filter((items) => {
        if(items.sku) {
            return items.sku.toLowerCase().includes(sku.toLowerCase());
        }
    })

    const soldItemIds = filterSold.map((i) => {
        return {
            itemid: i.itemid
        };
    })

    try{
        await soldItemSub.remove({})
        await getUser.save();
        await soldItemSub.push({$each: soldItemIds});
        await getUser.save();
    } catch (error) {
        console.log(error) 
    }

    return res.status(200).send(`${userName} Sold-Items list updated`);
}

module.exports = update;