const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

//Edit user profile
exports.editProfile = catchAsyncErrors(async (req, res, next) => {
    const { name, email, description } = req.body;
    const user = await User.findById(req.user.id);
    if (user) {
        if (name) user.name = name;
        if (email) user.email = email;
        if (description) user.description = description;
        if (req.body.profilePic) {
            const img = req.body.profilePic;
            if (img) {
                const myCloud = await cloudinary.uploader.upload(img, {
                    folder: "ProfilePics",
                })
                user.profilePic = myCloud.secure_url;
                user.profilePic_id = myCloud.public_id;
            }
        }
        await user.save();
        res.status(200).json({
            success: true,
            user
        })
    }
});
