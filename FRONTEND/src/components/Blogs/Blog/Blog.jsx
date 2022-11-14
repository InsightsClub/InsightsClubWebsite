import React from "react";
import "./Blog.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ACTIVE_LIKE from "../../../media/activeLikeVector.svg";

function Blog({ blog }) {
	const navigate = useNavigate();
	return (
		<>
			<div
				className='blog-container'
				onClick={() => navigate(`/blog/${blog._id}`)}>
				<div className='blog-header'>
					<p className='blog-header-name'>{blog?.author.name}</p>
					<p className='blog-header-time'>
						{moment(blog.createdAt).format("MMM Do YYYY")}
					</p>
				</div>
				<div className='blog-main'>
					<p className='blog-main-content'>{blog?.description}</p>
				</div>
				<div className='blog-footer'>
					<div className='blog-footer-like'>
						<img src={ACTIVE_LIKE} alt='like' />
					</div>
					<p className='blog-likesCounter'>{blog?.likes}</p>
				</div>
			</div>
		</>
	);
}

export default Blog;
