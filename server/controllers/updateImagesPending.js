require('dotenv').config(); // .env config
const axios         = require('axios');
const serverUrl     = 'http://localhost:8090' || PORT
const PORT          = process.env.PORT || 8090;
const Pending          = require('../model/Pendingitem');


const updateImagesPending = async (req, res) => {

    const token = await axios.get(serverUrl + '/apptoken' ).then(res => res.data)

    try {
        const allItems      = await Pending.find();
        const getImages     = await allItems.filter(i => i.imageurl == null)

        for(let i = 0; i < getImages.length; i++){
            const itemid = getImages[i].itemid
            const id = getImages[i]._id
                await axios.get(
                    serverUrl +
                    '/image',
                    {
                        headers: {
                            itemId: itemid,
                            token: token
                        }
                    } 
                ).then(async(res) => {
                    let updateItem = await Pending.findByIdAndUpdate({_id: id}).exec();
                    await updateItem.set({imageurl: res.data})
                    await updateItem.save()
                    console.log(itemid + res.data + 'updated')
                }).catch(err => console.log(err))
            }
            res.status(200).json('images updated')
    }catch (err){
        console.log(err)
        res.status(500).json(err)
        // updateImagesPending()
    }
};


module.exports = updateImagesPending;