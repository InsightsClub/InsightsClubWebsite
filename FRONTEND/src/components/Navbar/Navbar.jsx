import React, { Fragment, useEffect, useState } from "react";
import Logo from "../../media/logo.png";
import User_Image from "../../media/user_profile.jpeg";
import "./Navbar.css";
import "@fontsource/mulish";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import AuthModal from "../AuthCards/Auth";

function Navbar() {
	const [menu, setMenu] = useState(false);
	const [showAuthModal, displayAuthModal] = useState(false);
	const [cookies] = useCookies(["user"]);
	const navigate = useNavigate();

	useEffect(() => {
		if (showAuthModal === true || menu === true)
			document.getElementsByTagName("body")[0].style.overflowY = "hidden";
		else document.getElementsByTagName("body")[0].style.overflowY = "scroll";
	});

	return (
		<Fragment>
			<nav className={menu ? "menu-active" : "navbar"}>
				<a className='nav-logo' href='/'>
					<img src={Logo} className='logo' alt='logo' />
				</a>
				<div className='menu-contents'>
					<div className='nav-menu-wrapper'>
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
									<img src={User_Image} className='profilepic' alt='Profile' />
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
									About
								</a>
							</li>
							<li className='menu-item menu-news'>
								<a className='nav-link' href='/articles'>
									News
								</a>
							</li>
							<li className='menu-item menu-events'>
								<a className='nav-link' href='/events'>
									Events
								</a>
							</li>
							<li className='menu-item menu-blogs'>
								<a className='nav-link' href='/blogs'>
									Blogs
								</a>
							</li>
							<li className='menu-item menu-videos'>
								<a className='nav-link' href='/videos'>
									Videos
								</a>
							</li>
						</ul>
					</div>
					<button
						id='profile-picture'
						className='profile-picture pp-desktop'
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
			<Outlet />
		</Fragment>
	);
}

export default Navbar;
