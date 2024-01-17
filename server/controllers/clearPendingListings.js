const Listings   = require ('../model/PendingCache');
const clearListings = async (req, res, next) => {
    try{
        await Listings.deleteMany({}).exec();
        console.log('Pending Cache cleared');
        res.status(200).send('Pending Cache cleared');
    }catch (err){
        console.log(err);
    }
}
module.exports = clearListings;