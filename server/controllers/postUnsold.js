const UnsoldItem         = require('../model/Unsolditem');
const UnsoldCache        = require('../model/UnsolditemCache');

const postUnsold = async (req, res, next) => {
    
    const data = req.convertedData
    const currentData = await UnsoldItem.find();
    const filterData = await data.filter((i) => 
        currentData.every(n => n.itemid !== i.itemid)
    )
    console.log('Listings being added to UnSoldListings:');
    console.log(filterData);
    try{
        await UnsoldItem.insertMany(filterData);
        await UnsoldCache.insertMany(data);
        console.log('UnSold Items DB updated')
        res.send('UnSold Items have been saved to DB')
    }catch (err){
        console.log(err);
    }
}

module.exports = postUnsold;