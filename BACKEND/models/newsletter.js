const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    pdf: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    thumbnail_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Newsletter = mongoose.model('newsletter', newsletterSchema);
module.exports = Newsletter;