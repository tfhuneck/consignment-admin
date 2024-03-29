require('dotenv').config(); // .env config
const axios         = require('axios');
const serverUrl     = 'http://localhost:8090' || PORT
const PORT          = process.env.PORT || 8090;
const Items         = require('../model/AllItem');


const updateImages = async (req, res) => {

    console.log('================== Getting Missing Item Images ===============')

    const token = await axios.get(serverUrl + '/apptoken' ).then(res => res.data)
    // console.log(token)

    try {
        const allItems      = await Items.find();
        const getImages     = await allItems.filter(i => i.status === 'active' && i.imageurl === null)
        console.log(`Calling Images for  ${getImages.length} Items`)

        for(let i = 0; i < getImages.length; i++){
            const itemid = getImages[i].itemid
            const id = getImages[i]._id
            console.log(`******** calling getImage for ${itemid} ********`)
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
                    let updateItem = await Items.findByIdAndUpdate({_id: id}).exec();
                    await updateItem.set({imageurl: res.data})
                    await updateItem.save()
                    console.log(itemid + res.data + 'updated')
                }) 
                .catch((err) => {
                    // console.log(err)
                    console.log('..... calling next item  Image ....')
                    return;
                })
        }
    }catch (err){
        console.log(err)
    }
        
    console.log(' ******************* Gettings Images Complete *********************')

};


module.exports = updateImages;