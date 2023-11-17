const totalBalance = (userData) => {
    if (userData && userData.balance.length > 0) {
        return userData.balance.map(i => i.payout).reduce((prev, next)=> (prev + next)).toFixed(2);
    }else{
        return 0
    }
}

module.exports = totalBalance;