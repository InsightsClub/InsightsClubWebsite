import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	FETCH_ONE,
} from "../constants/blogsActionTypes";
import { Fetch, Create, Update, Delete } from "../api/index.js";

const blogsUrl = "https://api.insights-club-vitb.ml/blog";

export const getBlogs = () => async (dispatch) => {
	try {
		const { data } = await Fetch(`${blogsUrl}/all`);
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createBlogs = (blog) => async (dispatch) => {
	try {
		const { data } = await Create(blog, `${blogsUrl}/new`);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
export const viewBlogs = (id) => async (dispatch) => {
	try {
		const { data } = await Fetch(`${blogsUrl}/${id}`);

		dispatch({ type: FETCH_ONE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
export const updateBlogs = (id, blog) => async (dispatch) => {
	try {
		const { data } = await Update(id, blog, blogsUrl);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
export const deleteBlogs = (id) => async (dispatch) => {
	try {
		await Delete(id, blogsUrl);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error.message);
	}
};
