require('dotenv').config(); // .env config
const axios         = require('axios');
const serverUrl     = 'http://localhost:8090' || PORT
const PORT          = process.env.PORT || 8090; // Enviroment Port
const Listings      = require('../model/AllItem');
const User          = require('../model/User');
const UserNew       = require('../model/UserNew');
const totalCashouts = require('../modules/totalCashouts');
const payout        = require('../modules/payout');

const updateUser = async (req, res, next) => {

    
    const userId            = req.query.userData.userid;
    // const getUser           = await User.findOne({userid: userId}).exec();
    const getUser           = await UserNew.findOne({userid: userId}).exec();
    
    const sku               = getUser.skucode;
    const activeItemSub     = await getUser.activeitems;
    const pendingItemSub    = await getUser.pendingitems;
    const soldItemSub       = await getUser.solditems;
    const unsoldItemSub     = await getUser.unsolditems;
    const canceledItemSub   = await getUser.canceleditems;
    const balanceSub        = await getUser.balance;
    
    console.log(`================ Updating User Data for ${sku} ================`);

    const data              = await Listings.find();
    const userData          = data.filter((items) => {
        if(items.sku) {
            return items.sku.toLowerCase().includes(sku.toLowerCase());
        }});
        
    const Active            = userData.filter((i) =>  i.status === 'active')
    const Pending           = userData.filter((i) =>  i.status === 'pending')
    const Sold              = userData.filter((i) =>  i.status === 'sold')
    const Unsold            = userData.filter((i) =>  i.status === 'unsold')
    const Canceled          = userData.filter((i) =>  i.status === 'canceled')

    // Active Data Points
    const activeTotal   = Active && Active.length > 0 ? Active.map(i => i.currentprice).reduce((prev, next)=> (prev + next)).toFixed(2) : 0;
    const activePayout  = Active && Active.length > 0 ? Active.map(i => Number(payout(i.currentprice))).reduce((prev, next)=> prev + next).toFixed(2) : 0;
    const activeData    = {
        sum : Number(Active.length),
        total: activeTotal,
        payout: activePayout,
    }
   
    // Pending Data Points 
    const pendingTotal  = Pending && Pending.length > 0 ? Pending.map(i => i.finalprice).reduce((prev, next)=> (prev + next)).toFixed(2) : 0;
    const pendingPayout = Pending && Pending.length > 0 ? Pending.map(i => Number(payout(i.finalprice))).reduce((prev, next)=> (prev + next)).toFixed(2) : 0;
    const pendingData   = {
        sum : Number(Pending.length),
        total: pendingTotal,
        payout: pendingPayout,
    }

    // Sold Data Points 
    const soldTotal  = Sold && Sold.length > 0 ? Sold.map(i => i.finalprice).reduce((prev, next)=> (prev + next)).toFixed(2) : 0;
    const soldPayout = Sold && Sold.length > 0 ? Sold.map(i => Number(payout(i.finalprice))).reduce((prev, next)=> (prev + next)).toFixed(2) : 0;
    const soldData   = {
        sum : Number(Sold.length),
        total: soldTotal,
        payout: soldPayout,
    }

    // Unsold Data Points 
    const unsoldData   = {
        sum : Number(Unsold.length),
    }

    // Canceled Data Points 
    const canceledData   = {
        sum : Number(Canceled.length),
    }

    // Balance Data 
    const balanceItems      = Sold.map((i) => {
        return {
            title : i.title,
            price: Number(i.finalprice),
            payout: Number(payout(i.finalprice)),
            date: i.endtime,
        };
    })

    // Current Balance 
    let payoutTotal     = soldPayout
    let cashoutTotal    = totalCashouts(getUser);
    const newBalance    = Number((payoutTotal - cashoutTotal).toFixed(2));

    // conole logging updates
    console.log(`${sku} active items: `)
    console.log(activeData)
    console.log(`${sku} pending items: `)
    console.log(pendingData)
    console.log(`${sku} sold items: `)
    console.log(soldData)
    console.log(`${sku} unsold items: `)
    console.log(unsoldData)
    console.log(`${sku} canceled items: `)
    console.log(canceledData)
    console.log(`${sku} balance: `)
    console.log(newBalance)

    // Update User Data
    await UserNew.findOneAndUpdate({userid: userId},
        {
            $set: {
                activeitems: activeData,
                pendingitems: pendingData,
                solditems: soldData,
                unsolditems: unsoldData,
                canceleditems: canceledData,
                balance : balanceItems,
                currentbalance : newBalance
            },
        },
    )
    console.log('================= User Update Complete ===================')
    res.status(200).send(`user ${sku} updated`);
}

module.exports = updateUser;