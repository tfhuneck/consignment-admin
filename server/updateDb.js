const MainData = require('./model/AllItem');
const SoldData = require('./model/Solditem');
const ActiveData = require('./model/Activelisting');
const ActiveCache = require('./model/ActiveCache')
const PendingData = require('./model/Pendingitem');
const fs = require('fs');


const updateDb = async (req, res) => {
    const main = await MainData.find();
    const sold = await SoldData.find();
 
    const missing = sold.filter((i) => main.every((n) => i.itemid !== n.itemid))
 
    console.log(missing.length)
  
   let addMissingData = missing.map((i) => {
        return{
            itemid : i.itemid,
            title : i.title,
            sku : i.sku,
            itemurl : i.itemurl,
            imageurl : i.imageurl,
            starttime : i.starttime,
            endtime : i.endtime,
            finalprice : i.price,
            paymentstatus : i.paymentstatus,
            status : 'sold'
        }
   })

   console.log(addMissingData)

    try{
        await MainData.insertMany(addMissingData)
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    res.send('update complete');
}

module.exports = updateDb;