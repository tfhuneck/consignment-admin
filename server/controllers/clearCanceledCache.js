const Listings   = require ('../model/CanceledCache');
const clearListings = async (req, res, next) => {
    try{
        await Listings.deleteMany({}).exec();
        // console.log('Pending Cache cleared');
        res.status(200).send('Canceled Cache cleared');
    }catch (err){
        console.log(err);
    }
}
module.exports = clearListings;