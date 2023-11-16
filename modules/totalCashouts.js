
const totalBalance = (userData) => {
    if (userData && userData.cashouts.length > 0) {
        return userData.cashouts.map(i => i.amount).reduce((prev, next)=> (prev + next)).toFixed(2);
    }else{
        return 0
    }
}

module.exports = totalBalance;