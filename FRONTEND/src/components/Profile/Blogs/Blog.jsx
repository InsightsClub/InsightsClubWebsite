import React from "react";
import "./Blog.css";
import LIKE from "../../../media/likeVector.svg";

function Blog({ blog }) {
	return (
		<>
			<div className='profile-blog-container'>
				<div className='profile-blog-header'>
					<p className='profile-blog-header-name'>{blog.author.name}</p>
					<p className='blog-header-time'>{blog.createdAt}</p>
				</div>
				<div className='profile-blog-main'>
					<p className='profile-blog-main-content'>{blog.description}</p>
				</div>
				<div className='profile-blog-footer'>
					<div className='profile-we'>
						<div className='profile-blog-footer-like'>
							<img src={LIKE} alt='like' className='profile-like' />
							<p className='profile-blog-likesCounter'>{blog.likes}</p>
						</div>
					</div>
				</div>
				<div className='profile-blog-delete-edit'>
					<button
						className='profile-blog-delete'
						onClick={() => console.log(blog._id)}>
						Delete
					</button>
					<button className='profile-blog-edit'>Edit</button>
				</div>
			</div>
		</>
	);
}

export default Blog;
