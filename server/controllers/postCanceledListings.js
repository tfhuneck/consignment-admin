const Canceled = require('../model/CanceledCache');

const postCanceled = async (req, res) => {

    const currentData = await Canceled.find();
    let cancelationArray = []
    const cancellations = req.body.data.cancellations;

    try{
        for(let i = 0; i < cancellations.length; i++){
            let items = cancellations[i].lineItems;
            let canceldate = cancellations[i].cancelCloseDate.value;
            let orderid = cancellations[i].legacyOrderId;
            if (items.length > 1 ){
                for (let j = 0; j < items.length; j ++){
                    let itemid = items[j].itemId;
                    let title = items[j].itemTitle;
                    let data = {
                        itemid,
                        title,
                        canceldate,
                        orderid
                    }
                    cancelationArray.push(data)
                }
            } else {
                let itemid = items[0].itemId;
                let title = items[0].itemTitle;
                let data = {
                    itemid,
                    title, 
                    canceldate,
                    orderid
                }
                cancelationArray.push(data)
            }
        }

        const filteredData = await cancelationArray.filter((i) => currentData.every(n => n.itemid !== i.itemid));
        console.log(`Canceled data being added: ${filteredData.length}`);
        
        try{
            await Canceled.insertMany(filteredData);
            console.log('canceled items added to db');
        }catch (err){
            console.log(err);
        }
        res.status(200).json('cancellations saved to db')
    } catch (err){
        res.status(500).json(err)
    }
    
}

module.exports = postCanceled;



// const updateItems = await cancelationArray.filter((i) => currentData.some(n => n.itemid === i.itemid));
// console.log(`updatedata length: ${updateData.length}`)
// console.log(`updateitems length: ${updateItems.length}`)
// const updateData        = updateItems.map((i) => ({
//     filter: { itemid: i.itemid }, // Filter condition for each item
//     update: {
//         $set: {
//             orderid : i.orderid
//         }
//     }
// }));
// try{
//     await Promise.all(updateData.map(async (data) => {
//         await Canceled.updateMany(data.filter, data.update);
//     }));
//     console.log('Canceled Listings DB items updated');
// }catch (err){
//     console.log(err);
//     res.status(500).json(err);
// }