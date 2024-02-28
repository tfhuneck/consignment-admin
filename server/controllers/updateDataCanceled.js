const Canceled      = require('../model/CanceledItem');
const MainData      = require('../model/AllItem');

const updateCancledListings = async (req, res) => {

    console.log('Canceled Items to Main called')

    const canceledData      = await Canceled.find();
    const mainData          = await MainData.find();
    const updateItems       = await canceledData.filter((i) => mainData.some(n => n.itemid === i.itemid ));
    const updateData        = updateItems.map((i) => ({
        filter: { itemid: i.itemid }, // Filter condition for each item
        update: {
            $set: {
                endtime: i.endtime,
                status: 'canceled',
                canceldate: i.canceldate
            }
        }
    }));

    console.log(`Canceled update items: ${updateItems.length}`)

    try{
        await Promise.all(updateData.map(async (data) => {
            await MainData.updateMany(data.filter, data.update);
        }));
        console.log('Canceled Listings DB items updated');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }

    res.status(200).json('Success Main DB updated successfully Canceled data');
    
}

module.exports = updateCancledListings;
