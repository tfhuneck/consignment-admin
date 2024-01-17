const Listing      = require ('../model/Pendingitem');

const getAllPending = async (req, res) => {

    try{
        const data              = await Listing.find();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getAllPending;