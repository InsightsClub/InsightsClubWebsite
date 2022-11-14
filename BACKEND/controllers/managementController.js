const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require("../models/userModel");
const Department = require("../models/departmentsModel");
const Events = require("../models/eventsModel");
const Blogs = require("../models/blogModel");
const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config({ path: "config/config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Get all departments
exports.getAllDept = catchAsyncErrors(async (req, res, next) => {
    const departments = await Department.find({},
        {_id: 1, name: 1, shortDescription: 1, description: 1},
        {sort: { updatedAt: -1 }}
    );
    res.status(200).json({
        success: true,
        departments
    });
})

// get Insights core team members by department
exports.getUsersByDept = catchAsyncErrors(async (req, res, next) => {
    const depID = req.params.id;
    const users = await User.find({ department: depID },
        {_id: 1, name: 1, username: 1, email: 1, description: 1});
    res.status(200).json({
        success: true,
        users
    });
});

//USER MANAGEMENT - done by ADMIN only
//Get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin) {
        const users = await User.find({},
            {_id: 1, name: 1, email: 1, description: 1, isAdmin: 1, isCoAdmin: 1}
        );
        res.status(200).json({
            success: true,
            users
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});

//Get user by id
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id, {_id: 1, name: 1, username: 1, email: 1, description: 1, isAdmin: 1, isCoAdmin: 1, department: 1});
    if(!user) {
        return next(new ErrorHandler(`User not found`, 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});

//Delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin) {
        const user = await User.findById(req.params.id);
        if(!user) {
            return next(new ErrorHandler(`User not found`, 404));
        }
        await user.remove();
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});

//Make user co-admin
exports.makeCoAdmin = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin) {
        const user = await User.findById(req.params.id);
        if(!user) {
            return next(new ErrorHandler(`User not found`, 404));
        }
        user.isCoAdmin = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: "User made co-admin successfully"
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});

//Remove user from co-admin
exports.removeCoAdmin = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin) {
        const user = await User.findById(req.params.id);
        if(!user) {
            return next(new ErrorHandler(`User not found`, 404));
        }
        user.isCoAdmin = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: "User removed from co-admin successfully"
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});



// DEPARTMENT MANAGEMENT - done by ADMINS
// CREATE
exports.createNewDepartment = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin || req.user.isCoAdmin) {
        const { name, shortDescription, description } = req.body;
        const department = await Department.create({
            name,
            description,
            shortDescription
        });

        res.status(201).json({
            success: true,
            department
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});

// UPDATE
exports.updateDepartment = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin || req.user.isCoAdmin) {
        const deptID = req.params.id;
        const toUpdate = await Department.findById(deptID);
        if(!toUpdate) {
            return next(new ErrorHandler('Department not found', 404));
        }

        const newDeptData = req.body;
        const updated = await Department.findByIdAndUpdate(deptID, newDeptData, { runValidators: true });

        res.status(200).json({
            success: true,
            updated
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});

// DELETE
exports.deleteDepartment = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin || req.user.isCoAdmin) {
        const deptID = req.params.id;
        const toDelete = await Department.findById(deptID);

        if(!toDelete) {
            return next(new ErrorHandler('Department not found', 404));
        }

        const deleted = await toDelete.remove();

        await User.updateMany({ department: deptID }, { $unset: { department: 1 } });

        res.status(200).json({
            success: true,
            deleted
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});
 


//EVENT MANAGEMENT - done by ADMIN & CO-ADMIN

//CREATE NEW EVENT
exports.createNewEvent = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin || req.user.isCoAdmin) {
        const img = req.body.image;
        if (!img) {
            return next(new ErrorHandler("Image not available", 404));
        }
        const myCloud = await cloudinary.uploader.upload(img, {
        folder: "Events",
        });
        const { title, description, date, domain, department, shortDescription, mode, status } = req.body;
        const event = await Events.create({
          shortDescription, mode, status,
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
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
})

//DELETE EVENT
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin || req.user.isCoAdmin) {
        const event = await Events.findById(req.params.id);
        if (!event) {
            return next(new ErrorHandler(`Event details with event id: ${req.params.id} not found !!`, 404));
        }
        // deleting event image from cloudinary
        await cloudinary.uploader.destroy(event.image.public_id);
        await event.remove();
        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        })
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
})


//UPDATE EVENT
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin || req.user.isCoAdmin) {
        let event = await Events.findById(req.params.id);
        let newEventData = req.body;
        if (!event) {
            return next(new ErrorHandler(`Event details with event id: ${req.params.id} not found !!`, 404));
        }
        if (req.files !== null && req.files.image !== undefined) {
            await cloudinary.uploader.destroy(event.image.public_id);
            const newImage = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            folder: "Events",
            });
            newEventData.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            };
        }
        event = await Events.findByIdAndUpdate(req.params.id, newEventData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Event details updated"
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});


//BLOG REVIEW - done by ADMIN & CO-ADMIN
exports.verifyBlog = catchAsyncErrors(async (req, res, next) => {
    if(req.user.isAdmin || req.user.isCoAdmin) {
        const blog = await Blogs.findById(req.params.id);
        if (!blog) {
            return next(new ErrorHandler(`Blog details with blog id: ${req.params.id} not found !!`, 404));
        }
        blog.isReviewed = true;
        blog.reviewedBy = req.user.id;
        await blog.save();
        res.status(200).json({
            success: true,
            message: "Blog verified successfully"
        });
    }
    else {
        return next(new ErrorHandler(`You are not authorized to perform this action`, 401));
    }
});


