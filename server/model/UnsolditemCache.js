const mongoose = require('mongoose');

const unsolditemCacheSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    imageurl: {type: String, default: null},
    starttime: {type: String, default: null},
    endtime: {type: String, default: null},
    },
    { timestamps: true }
);

const UnsoldCache = mongoose.model('UnsoldCache', unsolditemCacheSchema);

UnsoldCache.createCollection()
    .then((collection) => {
    console.log('Unsold Cache Items collection was created!');
    });

module.exports = UnsoldCache;