const mongoose = require('mongoose');

const canceledCaheSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    orderid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    imageurl: {type: String, default: null},
    starttime: {type: String, default: null},
    endtime: {type: String, default: null},
    canceldate: {type: String, default: null},
    },
    { timestamps: true }
);

const CanceledCache = mongoose.model('CanceledCache', canceledCaheSchema);

CanceledCache.createCollection()
    .then((collection) => {
    console.log('Canceled Items collection was created!');
    });

module.exports = CanceledCache;