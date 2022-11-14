import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { deleteBlogs } from "../../../actions/blogs";

const url = "https://api.insights-club-vitb.ml/blog/user";

function Blogs() {
	const [blogs, setBlogs] = useState([]);
	const [cookies] = useCookies();
	const dispatch = useDispatch();

	const handleDelete = (id) => {
		dispatch(deleteBlogs(id));
	};

	useEffect(() => {
		axios.get(`${url}/${cookies.user.id}`).then((res) => setBlogs(res.data));
	}, [blogs, dispatch, cookies.user.id]);

	return (
		<>
			{blogs?.map((b, i) => (
				<Blog key={i} blog={b} handleDelete={handleDelete} />
			))}
		</>
	);
}

export default Blogs;
