const mongoose = require('mongoose');

const activeActiveCacheSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    imageurl: {type: String, default: null},
    currentprice: {type: Number, default: 0},
    starttime: {type: String, default: null},
    timeleft: {type: String, default: null},
    bidcount: {type: Number, default: 0},
    watchcount: {type: Number, default: 0},
    status : {type: String, default: 'active'},
    },
    { timestamps: true }
);

const ActiveCache = mongoose.model('ActiveCache', activeActiveCacheSchema);

ActiveCache.createCollection()
    .then((collection) => {
    console.log('ActiveCaches collection was created!');
    });

module.exports = ActiveCache;