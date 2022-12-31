const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

module.exports = catchAsyncErrors(async (req, res, next) => {
	try {
		if (Object.keys(req.cookies).length === 0)
			return next(new ErrorHandler("User not authenticated !!", 400));
		else if (req.cookies.hasOwnProperty("token")) {
			var user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
			req.user = user;
			next(); // move on without any issues
		} else return next(new ErrorHandler("User not authenticated !!", 400));
	} catch (e) {
		if (e.name == "TokenExpiredError")
			return next(new ErrorHandler("Token expired !!", 400));
		else if (e.name == "JsonWebTokenError")
			return next(new ErrorHandler("User not authenticated !!", 400));
		else return next(new ErrorHandler("Some error occured !!", 500));
	}
});
