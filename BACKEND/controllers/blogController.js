const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const Blogs = require("../models/blogModel");
const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config({ path: "config/config.env" });
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const canEdit = async (blogID, userID) => {
	const isValid = mongoose.Types.ObjectId.isValid(blogID);
	if (!isValid) return next(new ErrorHandler(`${blogID} is not valid !!`, 400));

	const blog = await Blogs.findById(blogID)
		.populate("author", "-password -verified")
		.exec();
	if (userID.localeCompare(blog.author.id) == 0)
		return { _canEdit: true, blog };
	return { _canEdit: false };
};

//get all blogs
exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
	const blogs = await Blogs.find(
		{},
		{
			_id: 1,
			title: 1,
			description: 1,
			content: 1,
			tags: 1,
			author: 1,
			likes: 1,
			likedBy: 1,
			isReviewed: 1,
			reviewedBy: 1,
			createdAt: 1,
			updatedAt: 1,
		}
	)
		.populate("author", "-email -password -verified")
		.populate("reviewedBy", "-email -password -verified")
		.populate("likedBy", "-email -password -verified")
		.lean();
	res.status(200).json(blogs);
});

exports.getBlogByUser = catchAsyncErrors(async (req, res, next) => {
	const id = req.params.id;
	const blogs = await Blogs.find(
		{ author: id },
		{
			_id: 1,
			title: 1,
			description: 1,
			content: 1,
			tags: 1,
			author: 1,
			likes: 1,
			isReviewed: 1,
			reviewedBy: 1,
			createdAt: 1,
			updatedAt: 1,
		}
	)
		.populate("author", "-email -password -verified")
		.populate("reviewedBy", "-email -password -verified")
		.populate("likedBy", "-email -password -verified")
		.lean();
	res.status(200).json(blogs);
});

exports.getBlog = catchAsyncErrors(async (req, res, next) => {
	const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!isValid)
		return next(new ErrorHandler(`${req.params.id} is not valid !!`, 400));
	const blog = await Blogs.findById(req.params.id)
		.populate("author", "-email -password -verified")
		.populate("reviewedBy", "-email -password -verified")
		.populate("likedBy", "-email -password -verified")
		.lean();
	if (!blog) {
		return next(
			new ErrorHandler(`Blog with id: ${req.params.id} not found !!`, 404)
		);
	}
	res.status(200).json({ success: true, blog });
});

exports.createBlog = catchAsyncErrors(async (req, res, next) => {
	const author = mongoose.Types.ObjectId(req.user.id);
	const { title, description, tags, content } = req.body;
	const blog = await Blogs.create({
		title,
		description,
		tags,
		content,
		author,
	});
	res.status(201).json({ success: true, blog });
});

exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
	const CanEdit = await canEdit(req.params.id, req.user.id);
	if (!CanEdit._canEdit)
		return next(new ErrorHandler("You cannot edit this blog !!", 400));
	else
		try {
			await Blogs.findByIdAndDelete(CanEdit.blog._id).lean();
			res
				.status(200)
				.json({ success: true, message: "Blog deleted successfully !!" });
		} catch (e) {
			return next(new ErrorHandler(`Some error occured !!`, 500));
		}
});

exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
	const CanEdit = await canEdit(req.params.id, req.user.id);
	if (!CanEdit._canEdit)
		return next(new ErrorHandler("You cannot edit this blog !!", 400));
	else
		try {
			const blog = CanEdit.blog;
			const { title, description, tags, content } = req.body;
			blog.title = title;
			blog.description = description;
			blog.tags = tags;
			blog.content = content;

			await blog.save();
			res.status(200).json({ success: true, blog });
		} catch (e) {
			return next(new ErrorHandler(`Some error occured !!`, 500));
		}
});

//Like / dislike a blog
exports.likeBlog = catchAsyncErrors(async (req, res, next) => {
	const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!isValid)
		return next(new ErrorHandler(`${req.params.id} is not valid !!`, 400));

	const blog = await Blogs.findById(req.params.id).lean();
	if (!blog) {
		return next(
			new ErrorHandler(`Blog with id: ${req.params.id} not found !!`, 404)
		);
	}
	const user = await User.findById(req.user.id).lean();
	if (!user) {
		return next(
			new ErrorHandler(`User with id: ${req.user.id} not found !!`, 404)
		);
	}
	if (blog.hasOwnProperty("likes") && blog.likes > 0) {
		var i = 0;
		for (; i < blog.likes; i++) {
			if (blog.likedBy[i].equals(user._id)) {
				blog.likedBy.splice(i, 1);
				blog.likes = blog.likes - 1;
				await Blogs.updateOne({ _id: blog._id }, blog);
				res
					.status(200)
					.json({ success: true, message: "Blog disliked successfully !!" });
				return;
			}
		}
		if (i == blog.likes) {
			blog.likedBy.push(user._id);
			blog.likes = blog.likes + 1;
			await Blogs.updateOne({ _id: blog._id }, blog);
			res
				.status(200)
				.json({ success: true, message: "Blog liked successfully !!" });
			return;
		}
	} else {
		blog.likedBy = [user._id];
		blog.likes = 1;
		await Blogs.updateOne({ _id: blog._id }, blog);
		res
			.status(200)
			.json({ success: true, message: "Blog liked successfully !!" });
	}
});
