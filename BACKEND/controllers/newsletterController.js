const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');
const Newsletter = require("../models/newsletter");
const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config({ path: "config/config.env" });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

exports.getAllNewsletters = catchAsyncErrors(async (req, res, next) => {
    const newsletters = await Newsletter.find({}, { _id: 1, pdf: 1, thumbnail: 1 }, { sort: { 'createdAt': -1 } }).lean(); // newest first newsletters
    res.status(200).json(newsletters);
});

exports.createNewsletter = catchAsyncErrors(async (req, res, next) => {
    if ((req.user.isAdmin || req.user.isCoAdmin) && (req.body.pdf != undefined && req.body.pdf != null) && (req.body.thumbnail != undefined && req.body.thumbnail != null)) {
        const img = req.body.thumbnail;
        const pdf = req.body.pdf;
        if (img && pdf) {
            const myCloud = await cloudinary.uploader.upload(img, {
                folder: "Newsletters",
            })

            const newsletter = await Newsletter.create({
                pdf,
                thumbnail: myCloud.secure_url,
                thumbnail_id: myCloud.public_id
            })

            res.status(201).json({
                success: true,
                newsletter
            })
        }
    }
    else if (req.body.pdf == undefined || req.body.pdf == null) {
        return next(new ErrorHandler(`Please provide a pdf link`, 400));
    }
    else if (req.body.thumbnail == undefined || req.body.thumbnail == null) {
        return next(new ErrorHandler(`Please provide a thumbnail link`, 400));
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});