const Listings   = require ('../model/UnsolditemCache');
const clearListings = async (req, res, next) => {
    try{
        await Listings.deleteMany({}).exec();
        console.log('Unsold Cache cleared');
        res.status(200).send('Unsold Cache cleared');
    }catch (err){
        console.log(err);
    }
}
module.exports = clearListings;