const Users = require('./model/User');
const Allitems = require('./model/AllItem');
const Active = require('./model/Activelisting');
const Sold = require('./model/Solditem');
const Pending = require('./model/Pendingitem');
const Unsold = require('./model/Unsolditem');
fs = require('fs');

const runReport = async (req, res) => {

    const users     = await Users.find();
    const mainData  = await Allitems.find();
    const active    = await Active.find();
    const sold      = await Sold.find();
    const pending    = await Pending.find();
    const unsold    = await Unsold.find();

    for(let i = 0; i < users.length; i++){
        
        let sku = users[i].skucode;

        let userActive = active.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        let userPending = pending.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        let userSold = sold.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        let userUnsold = unsold.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        let userMain = mainData.filter((i) => {
            if(i.sku) {
                return i.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })

        let mainSold = userMain.filter((i) =>  i.status === 'sold')
        let mainActive = userMain.filter((i) =>  i.status === 'active')
        let mainPending = userMain.filter((i) =>  i.status === 'pending')
        let mainUnsold = userMain.filter((i) =>  i.status === 'unsold')
        let mainCanceled = userMain.filter((i) =>  i.status === 'canceled')

        console.log(`************* Items Report for ${sku} **********`)
        console.log(`Amount of Active Items: ${userActive.length}`)
        console.log(`Amount of Pending Items: ${userPending.length}`)
        console.log(`Amount of Sold Items: ${userSold.length}`)
        console.log(`Amount of Unsold Items: ${userUnsold.length}`)
        console.log('==============')
        console.log(`Amount of Main Items: ${userMain.length}`)
        console.log(`Active items in main: ${mainActive.length}`)
        console.log(`Pending items in main: ${mainPending.length}`)
        console.log(`Sold items in main: ${mainSold.length}`)
        console.log(`Unsold items in main: ${mainUnsold.length}`)
        console.log(`Canceled items in main: ${mainCanceled.length}`)
        console.log('==============')

        let totalSold = userSold.length >= 1 ? userSold.map(i => i.price).reduce((prev, next)=> (prev + next)).toFixed(2) : '0.00';
        let totalMain = mainSold.length >= 1 ? mainSold.map(i => i.finalprice).reduce((prev, next)=> (prev + next)).toFixed(2) : '0.00' ;

        console.log(`Total Sum from Sold items: $ ${totalSold}`)
        console.log(`Total Sum Sold from MainDB: $ ${totalMain}`)

        let missingSold = userSold.filter((i) => mainSold.every((n) => i.itemid !== n.itemid))
        let missingInMain = missingSold.filter((i) => mainData.every((n) => i.itemid !== n.itemid))
        let discrepency = mainData.filter((i) =>missingSold.some((n) => i.itemid === n.itemid))

        console.log(`Missing Sold items in Main DB are : ${missingSold.length}`)
        console.log(`Missing Sold missing in Main altogether : ${missingInMain.length}`)
        console.log('solddiscrepencies: ...')
        console.log(discrepency)

        let missingPending = userPending.filter((i) => mainPending.every((n) => i.itemid !== n.itemid))
        console.log(`pending discrepencies: ${missingPending.length}`)
        console.log(missingPending)
    }

    res.send('report complete')
}

module.exports = runReport;