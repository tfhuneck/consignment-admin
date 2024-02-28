const Sold          = require('../model/SolditemCache');
const MainData      = require('../model/AllItem');

const updateActiveListings = async (req, res) => {

    console.log('Sold Items to Main called')

    const soldData          = await Sold.find();
    const mainData          = await MainData.find();
    // const newitems          = await soldData.filter((i) => !mainData.some(n => n.itemid === i.itemid));
    const updateItems       = await soldData.filter((i) => mainData.some(n => n.itemid === i.itemid ));
    // const updateMain        = await mainData.filter((i) => soldData.some(n => n.itemid === i.itemid));
    const updateData        = updateItems.map((i) => ({
        filter: { itemid: i.itemid }, // Filter condition for each item
        update: {
            $set: {
                endtime: i.endtime,
                finalprice: i.price,
                paymentstatus: i.paymentstatus,
                status: 'sold'
            }
        }
    }));

    // console.log(`Sold data: ${soldData.length}`)
    console.log(`update items: ${updateItems.length}`)
    console.log(`update data: ${updateData.length}`)
    // console.log(`update main: ${updateMain.length}`)
    // console.log(`new items: ${newitems.length}`)

    try{
        await Promise.all(updateData.map(async (data) => {
            await MainData.updateMany(data.filter, data.update);
        }));
        console.log('Sold Listings DB items updated');
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }

    // try{
    //     if(newitems) await MainData.insertMany(newitems);
    //     console.log('Sold Listings DB new items added');
    // }catch (err){
    //     console.log(err);
    //     res.status(500).json(err);
    // }

    res.status(200).json('success Main DB updated successfully sold data');
    
}

module.exports = updateActiveListings;
