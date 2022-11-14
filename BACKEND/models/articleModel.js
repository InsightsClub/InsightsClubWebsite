const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleSchema = new Schema({

    title: {
        type: String,
        require: true,

    },

    description: {
        type: String,
        require: true,
    },

    tags: {
        type: [String],
        require: true,
    },

    content: {
        type: Object,
        require: true,
    },

    lastEditedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        require: true,
    },
    
    }, { timestamps: true })

const Article = mongoose.model("article", articleSchema)
module.exports = Article