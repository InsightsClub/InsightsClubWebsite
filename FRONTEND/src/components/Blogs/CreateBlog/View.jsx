import React, { useEffect, useState } from "react";
import "./View.css";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import LIKE from "../../../media/likeVector.svg";

const View = () => {
	const blogsUrl = "https://api.insights-club-vitb.ml/blog";
	const params = useParams();
	const [b, setBlog] = useState({});
	useEffect(() => {
		axios.get(`${blogsUrl}/${params.id}`).then((res) => {
			let data = res.data;
			setBlog(data);
		});
	}, [params.id]);

	const handleLikes = () => {
		//post user id
		// axios.post(1, `${blogsUrl}/${params.id}/like`);
	};

	if (b) {
		return (
			<>
				<Navbar />
				<div className='view-blog-container'>
					<div className='view-blog-header'>
						<p className='view-blog-title'>{b.blog?.title}</p>
					</div>
					<p className='view-blog-authorName'>
						Posted by {b.blog?.author.name} on{" "}
						{new Date(b.blog?.createdAt).toLocaleString()}
					</p>
					<div
						className='view-blog-content'
						dangerouslySetInnerHTML={{ __html: b.blog?.content }}></div>
					<div className='view-blog-footer'>
						<div className='view-blog-footer-like'>
							<img src={LIKE} alt='like' onClick={() => handleLikes()} />
						</div>
						<p className='view-blog-likesCounter'>{b.blog?.likes.length}</p>
					</div>
				</div>
			</>
		);
	} else {
		return <h3>Blog not found</h3>;
	}
};

export default View;
