import React, { useEffect, useState } from "react";
import "./View.css";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import LIKE from "../../../media/likeVector.svg";
import ACTIVE_LIKE from "../../../media/activeLikeVector.svg";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const View = () => {
	const navigate = useNavigate();
	const [like, setLike] = useState(false);
	const [cookie] = useCookies();
	const [error, setError] = useState("");
	const params = useParams();
	const [b, setBlog] = useState({});
	const url = `${process.env.REACT_APP_BACKEND_URL}/blog`;
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/blog/${params.id}`)
			.then((res) => {
				let { blog } = res.data;
				setBlog(blog);
				let likedArray = b?.likedBy;
				for (let i = 0; i < likedArray.length; i++) {
					if (likedArray[i] === cookie.user.id) {
						setLike(true);
						break;
					} else {
						setLike(false);
					}
				}
			});
	}, [params.id, like, cookie.user.id, b]);

	const handleLikes = () => {
		if (cookie.user.id) {
			axios.post(`${url}/${params.id}/like`);
			setLike((prev) => !prev);
		} else {
			setError("Sign in to Like");
		}
	};
	if (b) {
		return (
			<>
				<Navbar />
				<div className='view-blog-container'>
					<div className='view-blog-header'>
						<div className='view-blog-back' onClick={() => navigate("/blogs")}>
							&#10092;<span>back</span>
						</div>
						<p className='view-blog-title'>{b.title}</p>
					</div>
					<p className='view-blog-authorName'>
						Posted by {b?.author?.name} on{" "}
						{moment(b?.createdAt).format("MMM Do YY")}
					</p>
					<div
						className='view-blog-content'
						dangerouslySetInnerHTML={{ __html: b?.content }}></div>
					<div className='view-blog-footer'>
						<div className='view-blog-footer-like'>
							<img
								src={like ? ACTIVE_LIKE : LIKE}
								alt='like'
								onClick={() => handleLikes()}
							/>
						</div>
						<p className='view-blog-likesCounter'>{b?.likes}</p>
					</div>
					<p className='view-blog-error'>{error}</p>
				</div>
			</>
		);
	} else {
		return <h3>Blog not found</h3>;
	}
};

export default View;
