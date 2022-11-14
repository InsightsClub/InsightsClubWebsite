const mongoose = require("mongoose");

const { Schema } = mongoose;

const videoScehma = new Schema({
    title: {
        type: String,
        require: true,
    },

    description: {
        type: String,
        require: true,
    },

    embedLink: {
        type: String,
        require: true
    },

    thumbnail: {
        type: String
    },
    
    thumbnail_id: {
        type: String
    },
}, {timestamps: true});

const Video = mongoose.model("video", videoScehma)
module.exports = Video
