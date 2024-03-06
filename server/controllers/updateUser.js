require('dotenv').config(); // .env config
const axios         = require('axios');
const serverUrl     = 'http://localhost:8090' || PORT
const PORT          = process.env.PORT || 8090; // Enviroment Port
const Listings      = require('../model/AllItem');
const User          = require('../model/User');
const UserNew       = require('../model/UserNew');
const totalBalance  = require('../modules/totalBalance');
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

    // Update User Data
    await UserNew.findOneAndUpdate({userid: userId},
        {
            $set: {activeitems: activeData},
            $set: {pendingitems: pendingData},
            $set: {solditems: soldData},
            $set: {unsolditems: unsoldData},
            $set: {canceleditems: canceledData},
            $set: {balance : balanceItems},
            $set: {currentbalance : newBalance},
        },
    )

    // await UserNew.create(
    //     {
    //         userid: userId,
    //         name: getUser.name,
    //         skucode: getUser.skucode,
    //         activeitems: activeData,
    //         pendingitems: pendingData,
    //         solditems: soldData,
    //         unsolditems: unsoldData,
    //         canceleditems: canceledData,
    //         balance : balanceItems,
    //         currentbalance : newBalance,
    //     },
        
    // )


    // const activeAdd         = (Active.filter((i) => !activeItemSub.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)
    // const activeRemove      = (activeItemSub.filter((i) => !Active.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)

    // const pendingAdd        = (Pending.filter((i) => !pendingItemSub.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)
    // const pendingRemove     = (pendingItemSub.filter((i) => !Pending.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)

    // const soldAdd           = (Sold.filter((i) => !soldItemSub.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)
    // const soldRemove        = (soldItemSub.filter((i) => !Sold.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)

    // const unsoldAdd         = (Unsold.filter((i) => !unsoldItemSub.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)
    // const unsoldRemove      = (unsoldItemSub.filter((i) => !Unsold.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)

    // const canceledAdd       = (Canceled.filter((i) => !canceledItemSub.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)
    // const canceledRemove    = (canceledItemSub.filter((i) => !Canceled.some(n => n._id.toString() === i._id.toString()))).map((i) => i._id)

    // const balanceItems      = Sold.map((i) => {
    //     return {
    //         title : i.title,
    //         price: i.finalprice,
    //         date: i.endtime,
    //         payout: payoutCalc(i.finalprice)
    //     };
    // })

    // let payoutTotal     = totalBalance(getUser);
    // console.log(payoutTotal)
    // let cashoutTotal    = totalCashouts(getUser);
    // console.log(cashoutTotal)
    // const newBalance    = Number((payoutTotal - cashoutTotal).toFixed(2));
    // console.log(newBalance)
 

    // console.log(`Adding Active Items: ${activeAdd.length}`)
    // console.log(`Removing Active Items: ${activeRemove.length}`)
    // console.log(`Adding Pending Items: ${pendingAdd.length}`)
    // console.log(`Removing Pending Items: ${pendingRemove.length}`)
    // console.log(`Adding Sold Items: ${soldAdd.length}`)
    // console.log(`Removing Sold Items: ${soldRemove.length}`)
    // console.log(`Adding Unsold Items: ${unsoldAdd.length}`)
    // console.log(`Removing Unsold Items: ${unsoldRemove.length}`)
    // console.log(`Adding Canceled Items: ${canceledAdd.length}`)
    // console.log(`Removing Canceled Items: ${canceledRemove.length}`)

    // // Active Update
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$push: { activeitems: {$each: activeAdd } }},
    // )
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$pullAll: { activeitems: activeRemove }},
    // )
    // // Pending Update
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$push: { pendingitems: {$each: pendingAdd } }},
    // )
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$pullAll: { pendingitems: pendingRemove }},
    // )
    // // Sold Update
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$push: { solditems: {$each: soldAdd } }},
    // )
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$pullAll: { solditems: soldRemove }},
    // )
    // // Unsold Update
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$push: { unsolditems: {$each: unsoldAdd } }},
    // )
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$pullAll: { unsolditems: unsoldRemove }},
    // )
    // // Canceled Update
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$push: { canceleditems: {$each: canceledAdd } }},
    // )
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {$pullAll: { canceleditems: canceledRemove }},
    // )
    

    // // Current Balance Update
    // await UserNew.findOneAndUpdate({userid: userId},
    //     // {$push: {balance: {$each: balanceItems } }},
    //     {set: {balance : balanceItems}}
    // )

 
    // await UserNew.findOneAndUpdate({userid: userId},
    //     {currentbalance: newBalance},
    // )

    // console.log(`${sku} current balance updated to ${newBalance}`);
    console.log('================= User Update Complete ===================')
        
        
    // // try{
    //     // await activeItemSub.remove({});
    //     // await getUser.save();
    //     // await activeItemSub.push({$each: Active})
    //     // await getUser.save();
    //     // await balanceSub.remove({});
    //     // await getUser.save();
    //     // await balanceSub.push({$each: Sold});
    //     // await getUser.save();
    //     // await pendingItemSub.remove({})
    //     // await getUser.save();
    //     // await pendingItemSub.push({$each: Pending});
    //     // await getUser.save();
    // //     await soldItemSub.remove({})
    // //     await getUser.save();
    // //     await soldItemSub.push({$each: soldData});
    // //     await getUser.save();
    // // } catch (error) {
    // //     console.log(error) 
    // // }

    // // const updateActiveItems = async () => {
    // //     await axios.get(serverUrl + '/updateuseractive', {
    // //         params: { userId }
    // //     })
    // //     .then((res) => console.log(res.data))
    // //     .catch((err) => console.log(err));
    // // }

    // // const updateSoldItems = async () => {
    // //     await axios.get(serverUrl + '/updateusersold', {
    // //         params: { userId }
    // //     })
    // //     .then((res) => console.log(res.data))
    // //     .catch((err) => console.log(err));
    // // }

    // // const updatePendigItems = async () => {  
    // //     await axios.get(serverUrl + '/updateuserpending', {
    // //         params: { userId }
    // //     })
    // //     .then((res) => console.log(res.data))
    // //     .catch((err) => console.log(err));
    // // }

    // // const updateUnSoldItems = async () => {  
    // //     await axios.get(serverUrl + '/updateuserunsold', {
    // //         params: { userId }
    // //     })
    // //     .then((res) => console.log(res.data))
    // //     .catch((err) => console.log(err));
    // // }

    // // const updateUserBalance = async () => {
    // //     await axios.get(serverUrl + '/updateuserbalance', {
    // //         params: { userId }
    // //     })
    // //     .then((res) => console.log(res.data))
    // //     .catch((err) => console.log(err));
       
    // // }

    // // const updateCurrentBalance = async () => {
    // //     await axios.get(serverUrl + '/updateusercurrentbalance', {
    // //         params: { userId }
    // //     })
    // //     .then((res) => console.log(res.data))
    // //     .catch((err) => console.log(err));
    // // }
   
    // // await updateActiveItems();
    // // await updateSoldItems();
    // // await updatePendigItems();
    // // await updateUnSoldItems();
    // // await updateUserBalance();
    // // await updateCurrentBalance();

    res.status(200).send('user updated');

}

module.exports = updateUser;