const MainData = require('./model/AllItem');
const SoldData = require('./model/Solditem');
const ActiveData = require('./model/Activelisting');
const ActiveCache = require('./model/ActiveCache')
const PendingData = require('./model/Pendingitem');
const fs = require('fs');


const updateDb = async (req, res) => {
    // const active            = await ActiveData.find();
    // const cache             = await ActiveCache.find();
    const mainData          = await MainData.find();
    // const pending           = await PendingData.find();
    // const sold              = await SoldData.find();
    
    // const missingSold     = await mainData.filter((i) => sold.some(n => n.itemid === i.itemid && i.status !== 'sold'))
    // const missingActive     = await mainData.filter((i) => active.some(n => n.itemid === i.itemid && i.status !== 'active'))
    
    // const activeDelete = active.filter((i) => !cache.some(n => n.itemid === i.itemid))

    // console.log(activeDelete.length)

    // const deleteConditions  = activeDelete.map((i) => ({ itemid: i.itemid }));
    
    // await MainData.deleteMany({ $or: deleteConditions });

    // const refunded          = await sold.filter((i) => i.paymentstatus !== 'MarkedAsPaid')
    // const updatestatus      = await mainData.filter((i) => i.paymentstatus == 'MarkedAsPaid' && i.status !== 'sold')
    const updatestatus      = await mainData.filter((i) => i.status === null )
    console.log(updatestatus.length)
    // const updateItems       = await active.filter((i) => mainData.some(n => n.itemid === i.itemid));
    // const updatePending     = await pending.filter((i) => mainData.some(n => n.itemid === i.itemid));
    const updateData        = updatestatus.map((i) => ({
        filter: { itemid : i.itemid }, // Filter condition for each item
        update: {
            $set: {
                status : 'active'
            }
        }
    }));

    // console.log(updateData)
    // console.log(updatestatus)
    // console.log(updatestatus.length)
    // console.log(refunded)
    // console.log(refunded.length)
    // const data = JSON.stringify(refunded)
    // fs.writeFileSync('refunded.json', data);
    
    
    // const updateData        = updateItems.map((i) => ({
    //     filter: { itemid: i.itemid }, // Filter condition for each item
    //     update: {
    //         $set: {
    //             imageurl: i.imageurl,
    //         }
    //     }
    // }));

    try{
        await Promise.all(updateData.map(async (data) => {
            await MainData.updateMany(data.filter, data.update);
        }));
        // res.send('update complete')
        // console.log('Active items updated in Main DB');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    res.send('update complete');
}

module.exports = updateDb;