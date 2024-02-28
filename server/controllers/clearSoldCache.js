const Listings   = require ('../model/SolditemCache');
const clearListings = async (req, res, next) => {
    try{
        await Listings.deleteMany({}).exec();
        console.log('Sold Cache cleared');
        res.status(200).send('Sold Cache cleared');
    }catch (err){
        console.log(err);
    }
}
module.exports = clearListings;