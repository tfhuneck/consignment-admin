const Listing      = require ('../model/AllItem');

const getAllUnsold = async (req, res) => {

    try{
        const allData              = await Listing.find();
        const data = await allData.filter((i) => i.status === 'unsold' || i.status === 'canceled')
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getAllUnsold;