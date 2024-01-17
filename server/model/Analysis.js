const mongoose  = require('mongoose');

const analysisSchema = new mongoose.Schema({
    users: {type: Number, default: 0},
    activesum: {type: Number, default: 0},
    activeamount: {type: Number, default: 0},
    soldsum: {type: Number, default: 0},
    soldamount: {type: Number, default: 0},
    pendingsum: {type: Number, default: 0},
    pendingamount: {type: Number, default: 0},
    unsoldsum: {type: Number, default: 0},

    },
    { timestamps: true }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

Analysis.createCollection()
    .then((collection) => {
    console.log('Analysis was created');
    });

module.exports = Analysis;