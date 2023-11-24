const Request   = require('../model/Cashoutrequests');

const getRequest = async (req, res) => {

    try {
        const requests  = await Request.find();
        res.status(200).send(requests)
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = getRequest;