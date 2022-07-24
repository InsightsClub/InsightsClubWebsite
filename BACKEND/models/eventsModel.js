const mongoose = require("mongoose");


const eventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event name is Required."]
    },
    description: {
        type: String,
        required: [true, "Event description is required"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    domain: {
        type: String,
        required: [true, "Event domain is required"]
    },
    department: {
        type: String,
        required: [true, "Event departement is required"]
    }
});

module.exports = mongoose.model("Events", eventsSchema);