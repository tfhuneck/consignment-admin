const SoldItem         = require('../model/Solditem');

const postSold = async (req, res, next) => {
    
    const data = req.convertedData
    const currentData = await SoldItem.find();
    const filterData = await data.filter((i) => 
        currentData.every(n => n.itemid !== i.itemid)
    )
    console.log('Listings being added to SoldListings:');
    console.log(filterData);
    try{
        await SoldItem.insertMany(filterData);
        console.log('Sold Items DB updated')
        res.send('Sold Items have been saved to DB')
    }catch (err){
        console.log(err);
    }
}

module.exports = postSold;