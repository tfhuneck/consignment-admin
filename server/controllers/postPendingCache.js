const PendingItem         = require('../model/PendingCache');

const postPendingCache = async (req, res, next) => {
    
    // console.log(req.convertedData)
    const data = req.convertedData

    try{
        await PendingItem.insertMany(data);
        console.log('Pending Cache updated')
        res.send('Pending Cache updated')
    }catch (err){
        console.log(err);
    }
}

module.exports = postPendingCache;