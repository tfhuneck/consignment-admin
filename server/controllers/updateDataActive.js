const Cache         = require ('../model/ActiveCache');
const Active        = require('../model/Activelisting');
const MainData      = require('../model/AllItem');

const updateActiveListings = async (req, res) => {

    console.log('Active Items to Main called')

    const activeItems       = await Cache.find();
    const mainData          = await MainData.find();
    const newitems          = await activeItems.filter((i) => !mainData.some(n => n.itemid === i.itemid));
    const updateItems       = await activeItems.filter((i) => mainData.some(n => n.itemid === i.itemid));
    const updateData        = updateItems.map((i) => ({
        filter: { itemid: i.itemid }, // Filter condition for each item
        update: {
            $set: {
                currentprice: i.currentprice,
                timeleft: i.timeleft,
                bidcount: i.bidcount,
                watchcount: i.watchcount,
                status : 'active'
            }
        }
    }));

    console.log(`New Active items being added: ${newitems.length}`)
    console.log(`Active Items being updated: ${updateData.length}`)
    
    try{
        if(newitems) await MainData.insertMany(newitems);
        console.log('Active Listings new items added');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    try{
        await Promise.all(updateData.map(async (data) => {
            await MainData.updateMany(data.filter, data.update);
        }));
        console.log('Active Listings items updated');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).json('success Main DB updated with active items successfully');
}

module.exports = updateActiveListings;
