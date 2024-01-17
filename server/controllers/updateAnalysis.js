const Analysis  = require('../model/Analysis');
const Users     = require('../model/User');
const Active    = require('../model/Activelisting');
const Pending   = require('../model/Pendingitem');
const Sold      = require('../model/Solditem');
const Unsold    = require('../model/Unsolditem');


const updateAnalysis = async (req, res) => {

    console.log('updating analysis data ...')
    
    try{
        const users     = await Users.find();
        const active    = await Active.find();
        const pending   = await Pending.find();
        const sold      = await Sold.find();
        const unsold    = await Unsold.find();
    
        const userSum       = await users.length;
        const activeSum     = await active.length;
        const activeAmount  = await active.map(i => i.currentprice).reduce((prev, next)=> (prev + next)).toFixed(2);
        const soldSum       = await sold.length;
        const soldAmount    = await sold.map(i => i.price).reduce((prev, next) => (prev + next)).toFixed(2);
        const pendingSum    = await pending.length;
        const pendingAmount = await pending.map(i => i.price).reduce((prev, next) => (prev + next)).toFixed(2);
        const unsoldSum     = await unsold.length;

        const update = {
            users : userSum,
            activesum : activeSum,
            activeamount : activeAmount,
            soldsum : soldSum,
            soldamount: soldAmount,
            pendingsum : pendingSum,
            pendingamount : pendingAmount,
            unsoldsum : unsoldSum
        }

        // const firstData = await Analysis.insertMany(update);

        await Analysis.findOneAndUpdate( null, update);
        
        res.status(200).json('analysis updated');

    } catch(err){
        res.status(500).send(err);

    }


}

module.exports = updateAnalysis;
