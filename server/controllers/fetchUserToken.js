const EbayToken = require('../model/ebayToken');

const getToken = async (req, res) => {
    
    try {
        const Token = await EbayToken.findOne({}).exec();
        res.send(Token);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getToken;