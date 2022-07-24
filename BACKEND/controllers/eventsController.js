const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Events = require("../models/eventsModel");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.homePage = catchAsyncErrors(async (req, res, next) => {
    res.send("Let's go");
});


//* GET ALL EVENTS
exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {

    const events = await Events.find();

    if (!events) {
        return next(new ErrorHandler("Events not found!!", 404));
    }

    res.status(200).json({
        success: true,
        events
    })
})

//* CREATE NEW EVENT
exports.createNewEvent = catchAsyncErrors(async (req, res, next) => {
    
    const img = req.files.image;

    if (!img) {
        return next(new ErrorHandler("Image not available", 404));
    }

    const myCloud = await cloudinary.uploader.upload(img.tempFilePath, {
      folder: "Events",
    });

    const { title, description, date, domain, department } = req.body;

    const event = await Events.create({
        title,
        description,
        domain, 
        department,
        date,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });
    res.status(201).json({
        success: true,
        event
    })
})

//* GET SPECIFIC EVENT DETAILS

