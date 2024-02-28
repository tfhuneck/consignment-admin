const mongoose = require('mongoose');

const pendingCacheSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    imageurl: {type: String, default: null},
    starttime: {type: String, default: null},
    endtime: {type: String, default: null},
    price: {type: Number, default: 0},
    paymentstatus: {type: String, default: null},
    status: {type: String, default: 'pending'},
    },
    { timestamps: true }
);

const PendingCache = mongoose.model('PendingCache', pendingCacheSchema);

PendingCache.createCollection()
    .then((collection) => {
    console.log('Pending Cache collection was created!');
    });

module.exports = PendingCache;