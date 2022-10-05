import React, { useState } from "react";
import "./Blog.css";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LIKE from "../../../media/likeVector.svg";

function Blog({ blog }) {
	const url = `https://api.insights-club-vitb.ml/blog/${blog._id}/like`;
	console.log(url);
	const [liked, setLiked] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<div className='blog-container'>
				<div
					className='blog-header'
					onClick={() => navigate(`/blog/${blog._id}`)}>
					<p className='blog-header-name'>{blog.author.name}</p>
					<p className='blog-header-time'>
						{moment(blog.createdAt).format("MMM Do YY")}
					</p>
				</div>
				<div
					className='blog-main'
					onClick={() => navigate(`/blog/${blog._id}`)}>
					<p className='blog-main-content'>{blog.description}</p>
				</div>
				<div className='blog-footer'>
					<div className='blog-footer-like'>
						<img src={LIKE} alt='like' />
					</div>
					<p className='blog-likesCounter'>{blog.likes}</p>
				</div>
			</div>
		</>
	);
}

export default Blog;
