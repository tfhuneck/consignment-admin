const User          = require('../model/User');
const totalBalance  = require('../modules/totalBalance');
const totalCashouts = require('../modules/totalCashouts')

const update = async (req, res, next) => {
    const userId            = req.query.userId
    const getUser           = await User.findOne({userid: userId}).exec();
    const userName          = getUser.name;

    const updateBalance = () => {
        let payoutTotal     = totalBalance(getUser);
        let cashoutTotal    = totalCashouts(getUser);
        let result = (payoutTotal - cashoutTotal).toFixed(2);
        return result;  
    }

    try{
        const newBalance = updateBalance(); 
        await getUser.set({currentbalance: 0});
        await getUser.save();
        await getUser.set({currentbalance: newBalance});
        await getUser.save();
    } catch (error) {
        console.log(error) 
    }

    return res.status(200).send(`${userName} current balance updated`);
}

module.exports = update;