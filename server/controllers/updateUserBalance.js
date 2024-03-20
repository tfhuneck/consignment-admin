// const User          = require('../model/User');
const User          = require('../model/UserNew')
const SoldItem      = require('../model/Solditem');
const payoutCalc    = require('../modules/payout');
    
const update = async (req, res, next) => {
    const userId            = req.query.userId;
    const getUser           = await User.findOne({userid: userId}).exec();
    const userName          = getUser.name;
    const soldData          = await SoldItem.find();
    const balanceSub        = getUser.balance;
    const sku               = getUser.skucode;

    const filterSold =  soldData.filter((items) => {
        if(items.sku) {
            return items.sku.toLowerCase().includes(sku.toLowerCase());
        }
    })

    const balanceItems = filterSold.map((i) => {
        return {
            title : i.title,
            price: i.price,
            date: i.endtime,
            payout: payoutCalc(i.price)
        };
    })

    try{
        await balanceSub.remove({});
        await getUser.save();
        await balanceSub.push({$each: balanceItems});
        await getUser.save();
    }   catch (error) {
        console.log(error) 
    }

    return res.status(200).send(`${userName} Balance-Items list updated`);
}

module.exports = update;