const Listing      = require ('../model/Activelisting');
const User         = require('../model/User');

const getActive = async (req, res) => {

    const userId = req.query.userId;

    try{
        const data = await Listing.find();
        const user = await User.findOne({userid: userId}).exec();
        console.log(user)
        const activeItems   = user.activeitems 
        const filterListings  =  data.filter((i) => 
                   activeItems.some(n => n.itemid === i.itemid));

        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getActive;