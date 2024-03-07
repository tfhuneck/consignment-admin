const SoldItem         = require('../model/Solditem');
const SoldCache        = require('../model/SolditemCache');

const postSold = async (req, res, next) => {
    
    const data = req.convertedData
    // // const currentData = await SoldItem.find();
    // // const filterData = await data.filter((i) => 
    // //     currentData.every(n => n.itemid !== i.itemid)
    // // )
    // console.log('Listings being added to SoldListings:');
    // console.log(filterData);
    try{
        // await SoldItem.insertMany(filterData);
        await SoldCache.insertMany(data);
        console.log('Sold Items added to Sold Cache')
        res.send('Sold Items have been saved to DB')
    }catch (err){
        console.log(err);
    }
}

module.exports = postSold;