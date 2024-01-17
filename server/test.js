const axios = require('axios');
const { get } = require('mongoose');

const getImageTest = async (id) => {
    console.log('call made')

    // await axios.get(
    //     'http://localhost:8090/image',
    //     {
    //         headers: {
    //             itemId: id
    //         }
    //     }
    // )
        // .then((res) => console.log(res.data))

    await axios.get(
        'http://localhost:8090/updateanalysis',
    )
        .then((res) => console.log(res.data))
}


getImageTest()

// '225900743007'