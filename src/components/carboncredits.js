// models/CarbonCredit.js
const mongoose = require('mongoose');

const CarbonCreditSchema = new mongoose.Schema({
    tokenId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    basePrice: { type: Number, required: true },
    owner: { type: String, required: true },
    image: { type: String },
    details: { type: String },
    tag: { type: String },
    isVerified: { type: Boolean, default: false },
    bids: [
        {
            bidderId: String,
            amount: Number,
            timestamp: Date,
        },
    ],
    ipfsHash: { type: String }, // IPFS hash field
});

module.exports = mongoose.model('CarbonCredit', CarbonCreditSchema);
