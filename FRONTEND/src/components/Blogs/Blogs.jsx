import React, { Fragment, useEffect, useState } from "react";
import Blog from "./Blog/Blog";
import "./Blogs.css";
import WRITE from "../../media/createBlog.svg";
import { getBlogs } from "../../actions/blogs";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BlogsSideBar from "./BlogSiderbar/BlogsSideBar";
import AuthModal from "../AuthCards/Auth";
import moment from "moment";

function Blogs() {
	const [blogOrder, setBlogOrder] = useState("LATEST");
	const dispatch = useDispatch();
	const [cookies] = useCookies();
	const navigate = useNavigate();
	const [showAuthModal, displayAuthModal] = useState(false);
	useEffect(() => {
		if (showAuthModal === true)
			document.getElementsByTagName("body")[0].style.overflowY = "hidden";
		else document.getElementsByTagName("body")[0].style.overflowY = "scroll";
	});
	useEffect(() => {
		dispatch(getBlogs());
	}, [dispatch, blogOrder]);
	const Blogs = useSelector((state) => state.blogs);
	const sideBarElement = [
		{ Element: { name: "Home", address: "/" } },
		{ Element: { name: "Event", address: "/events" } },
		{ Element: { name: "Videos", address: "/videos" } },
		{ Element: { name: "About", address: "/about" } },
	];
	return (
		<>
			<div className='blogs-main-container'>
				<div className='blogs-sidebar-container'>
					<BlogsSideBar array={sideBarElement} />
				</div>

				<div className='blogs-container'>
					<div className='blogs-container-header'>
						<div className='blogs-container-sort'>
							<p
								onClick={() => {
									setBlogOrder("LATEST");
								}}
								className={blogOrder === "LATEST" ? "LINED" : "NON-LINED"}>
								Latest
							</p>
							<p
								onClick={() => setBlogOrder("TOP")}
								className={blogOrder === "TOP" ? "LINED" : "NON-LINED"}>
								Top
							</p>
						</div>
						<div className='blogs-container-header-createBlog'>
							<div>
								<p
									onClick={() => {
										if (
											!(
												cookies.hasOwnProperty("user") &&
												Object.keys(cookies.user).length !== 0
											)
										) {
											displayAuthModal(true);
										} else {
											navigate("/write");
										}
									}}>
									{cookies.hasOwnProperty("user") &&
									Object.keys(cookies.user).length !== 0
										? "Write a Blog"
										: "Sign in to Write a blog"}
								</p>
							</div>
							<img src={WRITE} alt='write' />
						</div>
					</div>
					<div className='blogs-container-bloglist'>
						{blogOrder === "LATEST"
							? Blogs?.sort((blog) => {
									let blogDate = moment(blog.createdAt).format("MM DD YYYY");
									let currDate = moment(new Date()).format("MM DD YYYY");
									let diffDay = currDate.split(" ")[1] - blogDate.split(" ")[1];
									let diffMonth =
										currDate.split(" ")[0] - blogDate.split(" ")[0];
									if (diffMonth !== 0) {
										return diffDay + 30 * diffMonth;
									} else {
										return diffDay;
									}
							  }).map((blog, i) => (
									<Fragment key={i}>
										<Blog blog={blog} />
									</Fragment>
							  ))
							: Blogs?.sort((blog) => blog.likes)
									.reverse()
									.map((blog, i) => (
										<Fragment key={i}>
											<Blog blog={blog} />
										</Fragment>
									))}
					</div>
				</div>
			</div>
			{showAuthModal && <AuthModal displayModal={displayAuthModal} />}
		</>
	);
}

export default Blogs;
