const axios = require('axios');
const fs = require('fs');
const runUpdate = require('./controllers/maindbUpdate')


const runTest = async (id) => {
    console.log('call made')

    // runUpdate();
    // getCanceled();

    let userData = {
        userid : 'N5BGW21dzvW7rZe8llMrIkxySjG2'
    }

    const serverUrl     = 'http://localhost:8090' || PORT

    axios.get(
        serverUrl + 
        '/updateuser', 
        {params: { userData } }
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
    
    
    // axios.get(serverUrl + '/report')
    //     .then((res) => console.log(res.data))
    //     .catch((err) => console.log(err))
    
    // axios.get(serverUrl + '/testupdate')
    // .then((res) => console.log(res.data))
    // .catch((err) => console.log(err))

    // const token = await axios.get(serverUrl + '/apptoken' ).then(res => res.data)
    // const token         = req.headers.token
    // const itemId        = await req.headers.itemid
    // const itemId        = "225925053618"
    // const url           = `https://api.ebay.com/buy/browse/v1/item/get_item_by_legacy_id?legacy_item_id=${itemId}`;
    // const ebayHeaders   = {
    //     'Authorization': `Bearer ${token}`,
    //     'X-EBAY-C-ENDUSERCTX' : 'contextualLocation=country=<2_character_country_code>,zip=<zip_code>',
    //     'X-EBAY-C-MARKETPLACE-ID' : 'EBAY_US'
    // }

    // axios.get(url, {headers: ebayHeaders})
    // .then((result) => {
    //     console.log(result.data)
    // })
    // .catch((err) => {
    //     console.log(err);
    // });


    // await axios.get(serverUrl + '/refreshtoken')
    //     .then((res) => {
    //         token = res.data.access_token
    //         fs.writeFileSync('token.json', token)
    //         console.log(token)
    //     })
    //     .catch((err) => console.error(err));


    // const url           ='https://api.ebay.com/post-order/v2/cancellation/search?'
    // const ebayHeaders   = {
    //     'Authorization': `IAF ${token}`,
    //     'X-EBAY-C-ENDUSERCTX' : 'contextualLocation=country=<2_character_country_code>,zip=<zip_code>',
    //     'X-EBAY-C-MARKETPLACE-ID' : 'EBAY_US'
    // }

    // try {
    //     axios.get(url,
    //         {
    //             headers: ebayHeaders
    //         }
    //     )
    //         .then((res) => {
    //             // const imageUrl = result.data.image.imageUrl
    //             console.log(res.data)
    //             canceledData = JSON.stringify(res.data)
    //             fs.writeFileSync('canceledorders.json', canceledData)
    //             // res.status(200).json(imageUrl)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             // res.status(500).json(err)
    //         });
    // } catch (err){
    //     res.status(500).json(err)
    // }

    // await axios.get(
    //     'http://localhost:8090/image',
    //     {
    //         headers: {
    //             itemId: id
    //         }
    //     }
    // )
        // .then((res) => console.log(res.data))

    // await axios.get(
    //     'http://localhost:8090/updateanalysis',
    // )
    //     .then((res) => console.log(res.data))

    // const getAccessToken = async () => {
    //     await axios.get(serverUrl + '/refreshtoken')
    //         .then((res) => {
    //             userToken = res.data.access_token
    //             console.log(userToken)
    //         })
    //         .catch((err) => console.error(err));
    // }

    // getAccessToken();
    
    // console.log(token)
}


runTest()
