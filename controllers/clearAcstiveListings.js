const Listing       = require ('../model/Activelisting');
const clearListings = async (req, res, next) => {
    try{
        await Listing.deleteMany({}).exec();
        console.log('DB cleared');
        res.status(200).send('DB cleared');
    }catch (err){
        console.log(err);
    }
}
module.exports = clearListings;