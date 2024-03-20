const Analysis  = require('../model/Analysis');
// const Users     = require('../model/User');
const Users     = require('../model/UserNew')
const Listings  = require('../model/AllItem')


const updateAnalysis = async (req, res) => {

    console.log('updating analysis data ...')

    
    try{
        const listingData       = await Listings.find();
        const getUsers          = await Users.find();
        const Active            = await listingData.filter((i) =>  i.status === 'active')
        const Pending           = await listingData.filter((i) =>  i.status === 'pending')
        const Sold              = await listingData.filter((i) =>  i.status === 'sold')
        const Unsold            = await listingData.filter((i) =>  i.status === 'unsold')
        const Canceled          = await listingData.filter((i) =>  i.status === 'canceled')    
    
        const userSum       = await Number(getUsers.length);
        const activeSum     = await Number(Active.length);
        const activeAmount  = await Active.map(i => i.currentprice).reduce((prev, next)=> (prev + next)).toFixed(2);
        const soldSum       = await Number(Sold.length);
        const soldAmount    = await Sold.map(i => i.finalprice).reduce((prev, next) => (prev + next)).toFixed(2);
        const pendingSum    = await Number(Pending.length);
        const pendingAmount = await Pending.map(i => i.finalprice).reduce((prev, next) => (prev + next)).toFixed(2);
        const unsoldSum     = await Number(Unsold.length);
        const canceledSum   = await Number(Canceled.length);

        const update = {
            users : userSum,
            activesum : activeSum,
            activeamount : activeAmount,
            soldsum : soldSum,
            soldamount: soldAmount,
            pendingsum : pendingSum,
            pendingamount : pendingAmount,
            unsoldsum : unsoldSum,
            canceledsum: canceledSum,
        }

        // const firstData = await Analysis.insertMany(update);

        await Analysis.findOneAndUpdate( null, update);
        
        res.status(200).json('=============== Analysis updated ===============');

    } catch(err){
        res.status(500).send(err);

    }


}

module.exports = updateAnalysis;
