import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
} from "../constants/articleActionTypes";
import { Fetch, Create, Update, Delete } from "../api/index.js";

const articleUrl = "https://api.insights-club-vitb.ml/";

export const getArticle = () => async (dispatch) => {
	try {
		const { data } = await Fetch(articleUrl);
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createArticle = (article) => async (dispatch) => {
	try {
		const { data } = await Create(article, articleUrl);

		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const updateArticle = (id, article) => async (dispatch) => {
	try {
		const { data } = await Update(id, article, articleUrl);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteArticle = (id) => async (dispatch) => {
	try {
		await Delete(id, articleUrl);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error.message);
	}
};
