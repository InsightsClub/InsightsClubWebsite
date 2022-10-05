const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const google = require("googleapis");
const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config({ path: "config/config.env" });
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});
const OAuth2Client = new google.Auth.OAuth2Client(
	process.env.G_OAUTH_ID,
	process.env.G_OAUTH_SECRET,
	process.env.G_OAUTH_REDIRECT_URI
);
OAuth2Client.setCredentials({
	refresh_token: process.env.G_OAUTH_REFRESH_TOKEN,
});
const accessToken = OAuth2Client.getAccessToken();
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.EMAILER,
		clientId: process.env.G_OAUTH_ID,
		clientSecret: process.env.G_OAUTH_SECRET,
		refreshToken: process.env.G_OAUTH_REFRESH_TOKEN,
		accessToken: accessToken,
	},
});

const getRandomText = () => {
	const length = 11; // 11 character random text
	var result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

exports.logout = catchAsyncErrors(async (req, res, next) => {
    if (Object.keys(req.cookies).length !== 0 && req.cookies.hasOwnProperty('token')) {
        if (req.cookies.token == 'loggedout')
            res.status(200).json({ success: true, message: 'User was already logged out !' });
        else try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            // verified successfully
            res.setHeader('set-cookie', ['token=loggedout; path=/; domain=insights-club-vitb.ml samesite=none; httponly; Secure;', 'user={}; path=/; domain=insights-club-vitb.ml samesite=none; Secure;']); // added secure for production
            res.status(200).json({ success: true, message: "User logged out !!" });
        } catch (e) {
            if (e.name == 'TokenExpiredError')
                return next(new ErrorHandler('Token expired !!', 400));
            else
                return next(new ErrorHandler('Some error occured !!', 500));
        }
    } else {
        return next(new ErrorHandler('Token is missing !!', 400));
    }
});

exports.login = catchAsyncErrors(async (req, res, next) => {
	if (
		req.body.hasOwnProperty("username") &&
		req.body.hasOwnProperty("password")
	) {
		var user = {};
		user.username = req.body.username;
		user.password = req.body.password;
		try {
			let doc = await User.findOne({ username: user.username }).lean();
			if (doc == null)
				return next(new ErrorHandler("No such user exists !!", 404));
			else if (!doc.verified)
				return next(new ErrorHandler("Email not verified !!", 400));
			else if (bcrypt.compareSync(user.password, doc.password)) {
				const payload = {
					id: doc._id,
					username: user.username,
					password: user.password,
					isAdmin: doc.isAdmin,
					isCoAdmin: doc.isCoAdmin,
				};
				const token = jwt.sign(payload, process.env.JWT_SECRET, {
					expiresIn: "28d",
				});

				let expiry_date = new Date();
				expiry_date.setDate(expiry_date.getDate() + 28);

				// for user cookie
				delete payload.password;
				payload.email = doc.email;
				payload.name = doc.name;
				payload.department = doc.department;

                res.setHeader('set-cookie', [`token=${token}; path=/; domain=insights-club-vitb.ml expires=${expiry_date}; samesite=none; httponly; Secure;`, `user=${JSON.stringify(payload)}; path=/; domain=insights-club-vitb.ml expires=${expiry_date}; samesite=none; Secure;`]);

                res.status(200).json({ success: true, message: 'User logged in !!' });
            }
            else {
                res.setHeader('set-cookie', ['token=loggedout; path=/; domain=insights-club-vitb.ml samesite=none; httponly; Secure;', 'user={}; path=/; domain=insights-club-vitb.ml samesite=none; Secure;']); // added secure for production

				return next(new ErrorHandler("Invalid credentials !!", 400));
			}
		} catch (e) {
			console.error(e);
			return next(new ErrorHandler("Some error occured !!", 500));
		}
	} else {
		return next(new ErrorHandler("Username/password is missing !!", 400));
	}
});

exports.signup = catchAsyncErrors(async (req, res, next) => {
	var usr = {};
	if (
		req.body.hasOwnProperty("username") &&
		req.body.hasOwnProperty("name") &&
		req.body.hasOwnProperty("email") &&
		req.body.hasOwnProperty("password")
	) {
		usr.username = req.body.username;
		usr.name = req.body.name;
		usr.email = req.body.email;
		usr.password = bcrypt.hashSync(req.body.password, 10);

		if (
			req.body.hasOwnProperty("department") &&
			req.body.department.trim() != ""
		)
			usr.department = req.body.department.trim();
	}

	const user = new User(usr);
	try {
		user.save(async (err, doc) => {
			if (err && err.code === 11000) {
				return next(
					new ErrorHandler(
						`${Object.keys(err.keyPattern)[0]} is duplicate !!`,
						409
					)
				);
			} else if (err) {
				console.error(err);
				return next(new ErrorHandler("Some error occured !!", 500));
			} else {
				await transporter.sendMail({
					from: "Insights Club", // sender address
					to: doc.email,
					subject: "Insights Club - Confirm registration", // Subject line
					text: `Confirm your registeration at ${process.env.URL}/auth/verify/${doc._id}`,
					html: `<html>
                    <body>
                        <h3 
                            style="
                                padding-top: 30px;
                                padding-bottom: 10px;
                                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;"
                        >
                            Hi ${doc.name},
                        </h3>
                        <br>
                        <p
                            style="
                                padding-top: 30px;
                                padding-bottom: 10px;
                                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;"
                        >
                            To login to your account first complete your verification !
                        </p>
                        <center>
                        <a 
                            href="${process.env.URL}/auth/verify/${doc._id}" 
                            style="
                                background-color: rgb(0, 0, 0);
                                color: rgb(255, 255, 255);
                                padding: 15px 20px;
                                font-size: 0.875rem;
                                border-radius: 3px; 
                                color: white;
                                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                                font-weight: 500;
                                line-height: 1.75;
                                letter-spacing: 0.02857em;
                                text-transform: uppercase;
                                text-decoration: none;
                                margin-top: 50px;
                                margin-bottom: 50px"
                        >
                            Confirm your registration
                        </a>
                        </center>
                        <br><br><br>
                        <small>This email is automatic, please do not answer it.</small>
                    </body>
                </html>`,
				});
				res.status(200).json({ success: true, message: "User registered !!" });
			}
		});
	} catch (e) {
		console.error(e);
		return next(new ErrorHandler("Some error occured !!", 500));
	}
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	if (!req.body.hasOwnProperty("email"))
		return next(new ErrorHandler("Email is required !!", 400));
	try {
		const doc = await User.findOne({ email: req.body.email }).lean();
		if (doc == null) return next(new ErrorHandler("Email not found!!", 404));
		else if (!doc.verified)
			return next(new ErrorHandler("Email not verified !!", 400));
		else {
			await transporter.sendMail({
				from: "Insights Club", // sender address
				to: doc.email,
				subject: "Insights Club - Reset password", // Subject line
				text: `Reset your password at ${process.env.URL}/auth/reset/${doc._id}`,
				html: `<html>
                <body>
                    <h3 
                        style="
                            padding-top: 30px;
                            padding-bottom: 10px;
                            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;"
                    >
                        Hi ${doc.name},
                    </h3>
                    <br>
                    <p 
                        style="
                            padding-top: 30px;
                            padding-bottom: 10px;
                            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;"
                    >
                        Click the button and follow the link to reset your password:
                    </p>
                    <center>
                            <a 
                                href="${process.env.URL}/auth/reset/${doc._id}" 
                                style="
                                    background-color: rgb(0, 0, 0);
                                    color: rgb(255, 255, 255);
                                    padding: 15px 20px;
                                    font-size: 0.875rem;
                                    border-radius: 3px; 
                                    color: white;
                                    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                                    font-weight: 500;
                                    line-height: 1.75;
                                    letter-spacing: 0.02857em;
                                    text-transform: uppercase;
                                    text-decoration: none;
                                    margin-top: 50px;
                                    margin-bottom: 50px"
                            >
                                Reset your password
                            </a>
                    </center>
                    <br><br><br>
                    <small>This email is automatic, please do not answer it.</small>
                </body>
                </html>`,
			});

			res.status(200).json({
				success: true,
				message: "Email with link to reset password sent !!",
			});
		}
	} catch (e) {
		console.error(e);
		return next(new ErrorHandler("Some error occured !!", 500));
	}
});

exports.reset = catchAsyncErrors(async (req, res, next) => {
	const usr_id = req.params["id"];
	try {
		const password = getRandomText();
		const hashedPass = bcrypt.hashSync(password, 10);
		const doc = await User.findByIdAndUpdate(usr_id, {
			password: hashedPass,
		}).lean();
		if (doc == null) return next(new ErrorHandler("User not found !!", 404));
		else {
			await transporter.sendMail({
				from: "Insights Club", // sender address
				to: doc.email,
				subject: "Insights Club - Your new password", // Subject line
				text: `Your password has been reset to ${password}`,
				html: `<html>
                <body>
                    <h3
                        style="
                            padding-top: 30px;
                            padding-bottom: 10px;
                            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;"
                    >
                        Hi ${doc.name},
                    </h3>
                    <br>
                    <p 
                        style="
                            padding-top: 30px;
                            padding-bottom: 10px;
                            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;"
                    >
                        Your password has been reset to:
                    </p>
                    <center>
                        <h2
                            style="
                                padding-top: 30px;
                                padding-bottom: 10px;
                                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;"
                        >
                            ${password}
                        </h2>
                    </center>
                    <br><br><br>
                    <small>This email is automatic, please do not answer it.</small>
                </body>
                </html>`,
			});

			res.status(200).json({ success: true, message: "Password reset !!" });
		}
	} catch (e) {
		console.error(e);
		return next(new ErrorHandler("Some error occured !!", 500));
	}
});

exports.verify = catchAsyncErrors(async (req, res, next) => {
	const usr_id = req.params["id"];
	try {
		const doc = await User.findByIdAndUpdate(usr_id, { verified: true }).lean();
		if (doc == null) return next(new ErrorHandler("User not found !!", 404));
		else res.status(200).json({ success: true, message: "User verified !" });
	} catch (e) {
		console.error(e);
		return next(new ErrorHandler("Some error occured !!", 500));
	}
});
