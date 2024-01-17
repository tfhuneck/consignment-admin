const Analysis      = require ('../model/Analysis');

const getAnalysis = async (req, res) => {

    try{
        const data = await Analysis.find();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getAnalysis;