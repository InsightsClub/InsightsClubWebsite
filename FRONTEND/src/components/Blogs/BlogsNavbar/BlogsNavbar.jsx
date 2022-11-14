import React, { useEffect, useState } from "react";
import LOGO from "../../../media/InsightsLogo.svg";
import User_Image from "../../../media/user_profile.jpeg";
import "./BlogsNavbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../AuthCards/Auth";

function BlogsNavbar() {
	const [menu, setMenu] = useState(false);
	const [showAuthModal, displayAuthModal] = useState(false);
	const navigate = useNavigate();
	const [cookies] = useCookies(["user"]);

	useEffect(() => {
		if (showAuthModal === true || menu === true)
			document.getElementsByTagName("body")[0].style.overflowY = "hidden";
		else document.getElementsByTagName("body")[0].style.overflowY = "scroll";
	});

	return (
		<>
			<nav className={menu ? "menu-active" : "navbar"}>
				<a className='nav-logo' href='/'>
					<img src={LOGO} className='logo' alt='logo' />
				</a>
				<div className='menu-contents'>
					<div className='nav-menu-wrapper'>
						{menu ? (
							<ul id='primary-menu' className='menu nav-menu'>
								<li className='pp-mobile menu-item'>
									<button
										id='profile-picture'
										className='profile-picture-mobile'
										onClick={() => {
											if (
												!(
													cookies.hasOwnProperty("user") &&
													Object.keys(cookies.user).length !== 0
												)
											) {
												displayAuthModal(true);
											} else {
												navigate("/profile");
											}
										}}>
										<img
											src={User_Image}
											className='profilepic'
											alt='Profile'
										/>
										<span className='nav-link'>
											{cookies.hasOwnProperty("user") &&
											Object.keys(cookies.user).length !== 0
												? cookies.user.name
												: "Sign In"}
										</span>
									</button>
								</li>
								<li className='menu-item menu-about'>
									<a className='nav-link' href='/about'>
										Home
									</a>
								</li>
								<li className='menu-item menu-news'>
									<a className='nav-link' href='/events'>
										Events
									</a>
								</li>
								<li className='menu-item menu-events'>
									<a className='nav-link' href='/videos'>
										Videos
									</a>
								</li>
								<li className='menu-item menu-videos'>
									<a className='nav-link' href='/about'>
										About
									</a>
								</li>
							</ul>
						) : (
							<>
								<div className='blogsnavbar-search_box'>
									<input type='search' placeholder='Search' />
								</div>
							</>
						)}
						<button
							id='profile-picture'
							className='profile-picture pp-desktop '
							onClick={() => {
								if (
									!(
										cookies.hasOwnProperty("user") &&
										Object.keys(cookies.user).length !== 0
									)
								) {
									displayAuthModal(true);
								} else {
									navigate("/profile");
								}
							}}>
							<img src={User_Image} className='profilepic' alt='Profile' />
						</button>
					</div>
					<button
						id='menu-toggler'
						className='hamburger'
						onClick={() =>
							setMenu((prev) => (prev ? (prev = false) : (prev = true)))
						}>
						<span className='hamburger-line hamburger-line-top'></span>
						<span className='hamburger-line hamburger-line-middle'></span>
						<span className='hamburger-line hamburger-line-bottom'></span>
					</button>
				</div>
			</nav>
			{showAuthModal && <AuthModal displayModal={displayAuthModal} />}
		</>
	);
	// const navigate = useNavigate();
	// return (
	// 	<>
	// 		<div className='blogsnavbar-nav'>
	// 			<div className='blogsnavbar-logo'>
	// 				<img src={LOGO} alt='logo' onClick={() => navigate("/")} />
	// 			</div>
	// 			<div className='blogsnavbar-search_box'>
	// 				<input type='search' placeholder='Search by title or name...' />
	// 			</div>
	// 			<div className='blogsnavbar-hambugermenu'>
	// 				<img src={MENU} alt='menu' />
	// 			</div>
	// 		</div>
	// 	</>
	// );
}

export default BlogsNavbar;
