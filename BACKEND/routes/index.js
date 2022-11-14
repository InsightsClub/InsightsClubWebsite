const express = require("express");
const router = express.Router();
const {
	login,
	logout,
	signup,
	resetPassword,
	reset,
	verify,
} = require("../controllers/authController");
const {
	homePage,
	getAllEvents,
	getEventDetails,
} = require("../controllers/eventsController");
const {
	createNewEvent,
	updateEvent,
	deleteEvent,
	getAllDept,
	getUsersByDept,
	createNewDepartment,
	deleteDepartment,
	updateDepartment,
	verifyBlog,
	getAllUsers,
	getUserById,
	deleteUser,
	makeCoAdmin,
	removeCoAdmin
} = require("../controllers/managementController");
const {
	createBlog,
	getAllBlogs,
	getBlog,
	deleteBlog,
	updateBlog,
	likeBlog,
	getBlogByUser,
} = require("../controllers/blogController");
const { 
	getAllArticles,
	getArticle,
	createArticle,
	updateArticle,
	deleteArticle,
} = require("../controllers/articleController");
const {
	getAllVideos,
	createVideo,
	deleteVideo,
} = require("../controllers/videoController");
const verifyUser = require("../middlewares/verifyUser");
const {
	getAllNewsletters,
	createNewsletter,
} = require("../controllers/newsletterController");

router.route("/event/all").get(getAllEvents);
router.route("/event/new").post(verifyUser, createNewEvent);
router
	.route("/event/:id")
	.get(getEventDetails)
	.delete(verifyUser, deleteEvent)
	.put(verifyUser, updateEvent);

router.route("/auth/signout").get(logout);
router.route("/auth/signin").post(login);
router.route("/auth/signup").post(signup);
router.route("/auth/reset/:id").get(reset);
router.route("/auth/resetPassword").post(resetPassword);
router.route("/auth/verify/:id").get(verify);

router.route("/blog/all").get(getAllBlogs);
router.route("/blog/new").post(verifyUser, createBlog); //verifyUser,
router
	.route("/blog/:id")
	.get(getBlog)
	.delete(verifyUser, deleteBlog)
	.put(verifyUser, updateBlog);
router.route("/blog/:id/like").post(verifyUser, likeBlog);
router.route("/blog/:id/verify").get(verifyUser, verifyBlog);
router.route("/blog/user/:id").get(getBlogByUser);

router.route("/video/all").get(getAllVideos);
router.route("/video/new").post(verifyUser, createVideo);
router.route("/video/:id").delete(verifyUser, deleteVideo);

router.route("/dept/all").get(getAllDept);
router.route("/dept/:id").get(getUsersByDept);
router.route("/dept/new").post(verifyUser, createNewDepartment);
router
	.route("/dept/:id")
	.delete(verifyUser, deleteDepartment)
	.put(verifyUser, updateDepartment);
module.exports = router;

router.route("/article/all").get(getAllArticles);
router.route("/article/new").post(verifyUser, createArticle);
router
	.route("/article/:id")
	.get(getArticle)
	.delete(verifyUser, deleteArticle)
	.put(verifyUser, updateArticle);

router.route("/user/all").get(verifyUser, getAllUsers);
router
	.route("/user/:id")
	.get(getUserById)
	.delete(verifyUser, deleteUser);
router
	.route("/user/promote/:id")
	.put(verifyUser, makeCoAdmin);
router
	.route("/user/demote/:id")
	.put(verifyUser, removeCoAdmin);

router.route("/newsletter/all").get(getAllNewsletters);
router.route("/newsletter/new").post(verifyUser, createNewsletter);