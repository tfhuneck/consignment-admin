const Cache         = require ('../model/PendingCache');
const PendingMain    = require('../model/Pendingitem');

const updatePendingListings = async (req, res) => {

    const cachedItems       = await Cache.find();
    const pendingItems      = await PendingMain.find();
    const newitems          = await cachedItems.filter((i) => !pendingItems.some(n => n.itemid === i.itemid));
    const deleteItems       = await pendingItems.filter((i) => !cachedItems.some(n => n.itemid === i.itemid));
    const deleteConditions  = deleteItems.map((i) => ({ itemid: i.itemid }));

    console.log(newitems)
    console.log(deleteConditions)

    try{
        if(newitems) await PendingMain.insertMany(newitems);
        console.log('Pending Listings DB new items added');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    try{
        if (deleteConditions.length > 0) {
            await PendingMain.deleteMany({ $or: deleteConditions });
            console.log('Deleted items from Pending Listings collection:', deleteConditions);
        }
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).json('success pending DB updated successfully');
}

module.exports = updatePendingListings;
