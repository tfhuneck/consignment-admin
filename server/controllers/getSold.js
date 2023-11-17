const SoldListings  = require ('../model/Solditem');
const User          = require('../model/User');

const getSold = async (req, res) => {

    const userId = req.query.userId;

    try{
        const data = await SoldListings.find();
        const user = await User.findOne({userid: userId}).exec();
        console.log(user)
        const soldItems   = user.solditems 
        const filterListings  =  data.filter((i) => 
                   soldItems.some(n => n.itemid === i.itemid));

        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getSold;