require('dotenv').config(); // .env config
const axios         = require('axios');
const serverUrl     = 'http://localhost:8090' || PORT
const PORT          = process.env.PORT || 8090;
const Active        = require('../model/Activelisting');


const updateImagesActive = async (req, res) => {

    const token = await axios.get(serverUrl + '/apptoken' ).then(res => res.data)
    // console.log(token)

    try {
        const allItems      = await Active.find();
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
                    // console.log(res.data)
                    let updateItem = await Active.findByIdAndUpdate({_id: id}).exec();
                    await updateItem.set({imageurl: res.data})
                    await updateItem.save()
                    console.log(itemid + res.data + 'updated')
                })
            }
            

    }catch (err){
        console.log(err)
    }
};


module.exports = updateImagesActive;