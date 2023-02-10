import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { deleteBlogs } from "../../../actions/blogs";

const url = "https://api.insights-club-vitb.ml/blog/user";

function Blogs() {
	// const [blogs, setBlogs] = useState([]);
	// const [cookies] = useCookies();
	// const dispatch = useDispatch();

	// const handleDelete = (id) => {
	// 	dispatch(deleteBlogs(id));
	// };

	// useEffect(() => {
	// 	axios.get(`${url}/${cookies.user.id}`).then((res) => setBlogs(res.data));
	// }, [blogs, dispatch, cookies.user.id]);

	const blogs = [
		{
			author: {
				name: "Jon Wic",
			},
			createdAt: "1/1/1",
			description:
				"This is a test blog, THis is a test blog, THis is a test blog",
			likes: "100",
		},
		{
			author: {
				name: "Jon Wic",
			},
			createdAt: "1/1/1",
			description:
				"This is a test blog, THis is a test blog, THis is a test blog",
			likes: "100",
		},
		{
			author: {
				name: "Jon Wic",
			},
			createdAt: "1/1/1",
			description:
				"This is a test blog, THis is a test blog, THis is a test blog",
			likes: "100",
		},
	];

	return (
		<>
			{blogs?.map((b, i) => (
				// <Blog key={i} blog={b} handleDelete={handleDelete} />
				<Blog key={i} blog={b} />
			))}
		</>
	);
}

export default Blogs;
