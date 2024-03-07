const Cache         = require('../model/PendingCache');
const Pending       = require('../model/Pendingitem');
const MainData      = require('../model/AllItem');

const updateActiveListings = async (req, res) => {

    console.log('Pending Items to Main called')

    const cachedItems       = await Cache.find();
    const mainData          = await MainData.find();
    // const pendingData       = await Pending.find();
    // const newitems          = await pendingData.filter((i) => !mainData.some(n => n.itemid === i.itemid));
    const updateItems       = await cachedItems.filter((i) => mainData.some(n => n.itemid === i.itemid));
    const updateMain        = await mainData.filter((i) => cachedItems.some(n => n.itemid === i.itemid));
    const updateData        = updateItems.map((i) => ({
        filter: { itemid: i.itemid }, // Filter condition for each item
        update: {
            $set: {
                endtime: i.endtime,
                finalprice: i.price,
                paymentstatus: i.paymentstatus,
                itemurl: i.itemurl,
                status: 'pending'
            }
        }
    }));


    try{
        await Promise.all(updateData.map(async (data) => {
            await MainData.updateMany(data.filter, data.update);
        }));
        console.log('Pending DB items updated');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }

    // try{
    //     if(newitems) await MainData.insertMany(newitems);
    //     console.log('Pending items added to Main DB');
    // }catch (err){
    //     console.log(err);
    //     res.status(500).json(err);
    // }

    res.status(200).json('success main DB updated successfully with Pending Data');
    
}

module.exports = updateActiveListings;
