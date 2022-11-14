const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const Articles = require("../models/articleModel");
// const dotenv = require("dotenv");
// dotenv.config({ path: "config/config.env" });

//Get all articles
exports.getAllArticles = catchAsyncErrors(async (req, res, next) => {
    const articles = await Articles.find({}, {_id: 1, title: 1, description: 1, tags: 1, author: 1}).populate('author', '-password -verified').lean();
    res.status(200).json(articles);
});

//Get article by id
exports.getArticle = catchAsyncErrors(async (req, res, next) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid)
        return next(new ErrorHandler(`${req.params.id} is not valid !!`, 400));
    const article = await Articles.findById(req.params.id).populate('author', '-password -verified').lean();
    if (!article) {
        return next(new ErrorHandler(`Article with id: ${req.params.id} not found !!`, 404));
    }
    res.status(200).json({ success: true, article });
});

//Create article by admin or co-admin
exports.createArticle = catchAsyncErrors(async (req, res, next) => {
    if (req.user.isAdmin || req.user.isCoAdmin) {
        const lastEditedBy = mongoose.Types.ObjectId(req.user.id);
        const { title, description, tags, content } = req.body;
        const article = await Articles.create({
            title,
            description,
            tags,
            content,
            lastEditedBy
        });
        res.status(201).json({ success: true, article });
    }
});

//Update article by admin or co-admin
exports.updateArticle = catchAsyncErrors(async (req, res, next) => {
    if (req.user.isAdmin || req.user.isCoAdmin) {
        const lastEditedBy = mongoose.Types.ObjectId(req.user.id);
        const { title, description, tags, content } = req.body;
        const article = await Articles.findByIdAndUpdate(req.params.id, {
            title,
            description,
            tags,
            content,
            lastEditedBy
        }, { runValidators: true, new: true });
        res.status(200).json({ success: true, article });
    } else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});

//Delete article by admin or co-admin
exports.deleteArticle = catchAsyncErrors(async (req, res, next) => {
    if (req.user.isAdmin || req.user.isCoAdmin) {
        const article = await Articles.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, article });
    } else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});