const Listing       = require ('../model/ActiveCache');
const clearListings = async (req, res, next) => {
    try{
        await Listing.deleteMany({}).exec();
        // console.log('Active Cache cleared');
        res.status(200).send('Active Cache cleared');
    }catch (err){
        console.log(err);
    }
}
module.exports = clearListings;