const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');
const Videos = require("../models/videoModel");
const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config({ path: "config/config.env" });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

exports.getAllVideos = catchAsyncErrors(async (req, res, next) => {
    const videos = await Videos.find({}, { _id: 1, title: 1, description: 1, embedLink: 1, thumbnail: 1 }, { sort: { 'createdAt': -1 } }).lean(); // newest first videos
    res.status(200).json(videos);
});



exports.createVideo = catchAsyncErrors(async (req, res, next) => {
    if ((req.user.isAdmin || req.user.isCoAdmin) && req.body.hasOwnProperty('embedLink')) {
        
        req.body.embedLink = req.body.embedLink.trim();
        req.body.title = req.body.title.trim();
        if (req.body.embedLink === "" || req.body.title === "")
            return next(new ErrorHandler(`Please provide an embed link and/or title`, 400));

        const img = req.body.thumbnail;
        
        if (img) {
            const myCloud = await cloudinary.uploader.upload(img, {
                folder: "Videos",
            })

            const { title, description, embedLink } = req.body;
            const video = await Videos.create({
                title,
                description,
                embedLink,
                thumbnail: myCloud.secure_url,
                thumbnail_id: myCloud.public_id
            })

            res.status(201).json({
                success: true,
                video
            })
        } else {
            const { title, description, embedLink } = req.body;
            const video = await Videos.create({
                title,
                description,
                embedLink
            })

            res.status(201).json({
                success: true,
                video
            })
        }
    } else if (!req.body.hasOwnProperty('embedLink')) {
        return next(new ErrorHandler(`Please provide an embed link and/or title`, 400));
    } else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});



exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {
    if (req.user.isAdmin || req.user.isCoAdmin) {
        const video = await Videos.findById(req.params.id);
        if (!video) {
            return next(new ErrorHandler(`Video with id: ${req.params.id} not found !!`, 404));
        }
        if (video.thumbnail_id != undefined)
            await cloudinary.uploader.destroy(video.thumbnail_id);
        await video.remove();
        res.status(200).json({
            success: true,
            message: "Video deleted successfully"
        })
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});
