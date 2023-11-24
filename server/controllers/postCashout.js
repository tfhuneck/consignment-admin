const User          = require('../model/User');
const totalBalance  = require('../modules/totalBalance');
const totalCashouts = require('../modules/totalCashouts');

const CashoutTransaction = async(req, res) => {
    
    const userid        = req.body.displayUser.userid;
    const transaction   = req.body.transaction;
    let findUser        = await User.findOne({userid : userid}).exec()

    const updateBalance = () => {
        let payoutTotal     = totalBalance(findUser);
        let cashoutTotal    = totalCashouts(findUser);
        let result = payoutTotal - cashoutTotal;
        return result;
    }
    
    try{
        await findUser.cashouts.push({
            date: transaction.date,
            type: transaction.type,
            amount: transaction.amount,
            comment: transaction.comment
        })
        await findUser.save()
    }  catch(err){
        res.send(err)
    }
    try{
        const newBalance = updateBalance(); 
        await findUser.set({currentbalance: 0});
        await findUser.save();
        await findUser.set({currentbalance: newBalance});
        await findUser.save();
        console.log(findUser.name + ' current balance updated');
     } catch (error) {
         console.log(error) 
     }
     
     return res.send('transaction added')
}

module.exports = CashoutTransaction;