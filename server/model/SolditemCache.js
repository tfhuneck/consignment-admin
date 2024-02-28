const mongoose = require('mongoose');

const soldCacheSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    imageurl: {type: String, default: null},
    starttime: {type: String, default: null},
    endtime: {type: String, default: null},
    price: {type: Number, default: 0},
    paymentstatus: {type: String, default: null}
    },
    { timestamps: true }
);

const SoldCache = mongoose.model('SoldCache', soldCacheSchema);

SoldCache.createCollection()
    .then((collection) => {
    console.log('Sold Cache Items collection was created!');
    });

module.exports = SoldCache;