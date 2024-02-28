const User          = require('../model/User');
const totalBalance  = require('../modules/totalBalance');
const totalCashouts = require('../modules/totalCashouts');

const deleteTransaction = async (req, res) => {
    
    const userId            = req.body.userId;
    const transactionId     = req.body.id;
    
    try {
        await User.findOneAndUpdate({userid : userId},
            {$pull: {cashouts: {_id : transactionId}}})
            console.log('transaction deleted')    
        } catch(err) {
            res.send(err);
        }
        
    let findUser            = await User.findOne({userid : userId}).exec();
    const updateBalance = () => {
        let payoutTotal     = totalBalance(findUser);
        let cashoutTotal    = totalCashouts(findUser);
        let result = payoutTotal - cashoutTotal;
        return result;
    }

    try{
        const newBalance = await updateBalance(); 
        await findUser.set({currentbalance: 0});
        await findUser.save();
        await findUser.set({currentbalance: newBalance});
        await findUser.save();
        console.log(findUser.name + ' current balance updated');
        } catch (error) {
            console.log(error) 
        }

    res.status(200).send('transaction deleted')
}

module.exports = deleteTransaction;