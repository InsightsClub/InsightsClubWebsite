import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
} from "../constants/eventsActionTypes";
import { Fetch, Create, Update, Delete } from "../api/index.js";

const eventsUrl = "";

export const getEvents = () => async (dispatch) => {
	try {
		const { data } = await Fetch(eventsUrl);

		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createEvents = (event) => async (dispatch) => {
	try {
		const { data } = await Create(event, eventsUrl);

		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const updateEvents = (id, event) => async (dispatch) => {
	try {
		const { data } = await Update(id, event, eventsUrl);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteEvents = (id) => async (dispatch) => {
	try {
		await Delete(id, eventsUrl);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error.message);
	}
};
