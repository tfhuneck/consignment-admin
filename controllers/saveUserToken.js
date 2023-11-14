const EbayToken = require('../model/ebayToken');

const saveUserToken = async (req, res) => {
    
    const Token = JSON.parse(req.body.userToken);   
    
    try {
        await EbayToken.findOneAndReplace({}, {
            'access_token': Token.access_token,
            'expires_in': Token.expires_in,
            'refresh_token': Token.refresh_token,
            'refresh_token_expires_in': Token.refresh_token_expires_in
        });
        res.status(201).json({ 'success': `Usersettings updated` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }


}

module.exports = saveUserToken;