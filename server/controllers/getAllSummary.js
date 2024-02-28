const AllItems = require('../model/AllItem');

const getAllSummary = async (req, res) => {
    
    try{
        const data = await AllItems.find();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
}

module.exports = getAllSummary;