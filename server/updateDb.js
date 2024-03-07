const Users     = require('./model/User')
const Usersnew  = require('./model/UserNew')

const updateDb = async (req, res) => {
    
    const allUsers = await Users.find()
    console.log(allUsers.length)

    for(let i = 0; i < allUsers.length; i++){
        console.log(allUsers[i].skucode)
        let NewUser = {
            _id: allUsers[i]._id,
            userid: allUsers[i].userid,
            name: allUsers[i].name,
            email: allUsers[i].email,
            phone: allUsers[i].phone,
            address: allUsers[i].address,
            avatar: allUsers[i].avatar,
            skucode: allUsers[i].skucode,
            cashouts: allUsers[i].cashouts,
            createdAt: allUsers[i].createdAt,
            rules: allUsers[i].rules,
        }
        await Usersnew.create(NewUser)
        console.log(`data migrated for ${allUsers[i].skucode}`)
    }

    res.send('data migrated')
}

module.exports = updateDb;