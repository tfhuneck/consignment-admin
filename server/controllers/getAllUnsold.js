const Listing      = require ('../model/Unsolditem');

const getAllUnsold = async (req, res) => {

    try{
        const data              = await Listing.find();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getAllUnsold;