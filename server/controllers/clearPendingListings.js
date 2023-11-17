const Listings   = require ('../model/Pendingitem');
const clearListings = async (req, res, next) => {
    try{
        await Listings.deleteMany({}).exec();
        console.log('DB cleared');
        res.status(200).send('DB cleared');
    }catch (err){
        console.log(err);
    }
}
module.exports = clearListings;