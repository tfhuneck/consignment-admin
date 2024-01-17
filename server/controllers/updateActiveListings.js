const Cache         = require ('../model/ActiveCache');
const ActiveMain    = require('../model/Activelisting');

const updateActiveListings = async (req, res) => {

    const cachedItems       = await Cache.find();
    const activeItems       = await ActiveMain.find();
    const newitems          = await cachedItems.filter((i) => !activeItems.some(n => n.itemid === i.itemid));
    const deleteItems       = await activeItems.filter((i) => !cachedItems.some(n => n.itemid === i.itemid));
    const deleteConditions  = deleteItems.map((i) => ({ itemid: i.itemid }));
    const updateItems       = await cachedItems.filter((i) => activeItems.some(n => n.itemid === i.itemid));
    const updateData        = updateItems.map((i) => ({
        filter: { itemid: i.itemid }, // Filter condition for each item
        update: {
            $set: {
                currentprice: i.currentprice,
                timeleft: i.timeleft,
                bidcount: i.bidcount,
                watchcount: i.watchcount
            }
        }
    }));

    try{
        if(newitems) await ActiveMain.insertMany(newitems);
        console.log('Active Listings DB new items added');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    try{
        await Promise.all(updateData.map(async (data) => {
            await ActiveMain.updateMany(data.filter, data.update);
        }));
        console.log('Active Listings DB items updated');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    try{
        if (deleteConditions.length > 0) {
            await ActiveMain.deleteMany({ $or: deleteConditions });
            console.log('Deleted items from Active Listings collection:', deleteConditions);
        }
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).json('success active DB updated successfully');
}

module.exports = updateActiveListings;
