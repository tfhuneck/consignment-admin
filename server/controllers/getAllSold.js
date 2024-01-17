const Listing      = require ('../model/Solditem');

const getAllSold = async (req, res) => {

    try{
        const data              = await Listing.find();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getAllSold;