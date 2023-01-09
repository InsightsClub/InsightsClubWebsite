import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	FAIL,
	NEW_EVENT_REQUEST,
	NEW_EVENT_SUCCESS,
	NEW_EVENT_FAIL,
	CLEAR_ERRORS,
} from "../constants/eventsActionTypes";
import { Fetch, Create, Update, Delete } from "../api/index.js";
import axios from "axios";

let eventsUrl = `${process.env.REACT_APP_BACKEND_URL}/event`;  

export const getEvents = () => async (dispatch) => {
	try {
		const { data } = await Fetch(`${eventsUrl}/all`);
		dispatch({ type: FETCH_ALL, payload: data.events });
	} catch (error) {
		console.log(error.message);
	}
};
export const getEventByType = (type) => async (dispatch) => {
	try {
		switch(type){
			case "Ongoing":
				eventsUrl = `${eventsUrl}/all?status=ongoing`;
				break;
			case "Upcoming":
				eventsUrl = `${eventsUrl}/all?status=upcoming`;
				break;
			case "Past":
				eventsUrl = `${eventsUrl}/all?status=past`;
				break;
			default:
				eventsUrl = `${eventsUrl}/all`;
		}
		const { data } = await Fetch(eventsUrl);
		dispatch({ type: FETCH_ALL, payload: data.events });
	} catch (error) {
		console.log(error.message);
	}
};

export const getEventDetail = ({id}) => async (dispatch) => {
  try {
    const { data } = await Fetch(`${eventsUrl}/id`);
    dispatch({ type: FETCH_ALL, payload: data.events });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOngoingEvents = () => async (dispatch) => {
	try {
		const { data } = await Fetch(`${eventsUrl}/all?status=ongoing`);
		dispatch({ type: FETCH_ALL, payload: data.events });
	} catch (error) {
		console.log(error.message);
	}
};
export const getUpcomingEvents = () => async (dispatch) => {
	try {
		const { data } = await Fetch(`${eventsUrl}/all?status=upcoming`);
		dispatch({ type: FETCH_ALL, payload: data.events });
	} catch (error) {
		console.log(error.message);
	}
};
export const getPastEvents = () => async (dispatch) => {
	try {
		const { data } = await Fetch(`${eventsUrl}/all?status=past`);
		dispatch({ type: FETCH_ALL, payload: data.events });
	} catch (error) {
		console.log(error.message);
	}
};

export const createEvents = (event) => async (dispatch) => {
	try {
		dispatch({ type: NEW_EVENT_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.post(`${eventsUrl}/new`, event, config);

		dispatch({ type: NEW_EVENT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
		type: NEW_EVENT_FAIL,
		payload: error.response.data.message,
		});
	}
};

export const updateEvent = (id, event) => async (dispatch) => {
	try {
		console.log("event: ", event);
		const { data } = await axios.put(`${eventsUrl}/${id}`, event);
		dispatch({ type: UPDATE, payload: data });
		alert("Updated Successfully");
	} catch (error) {
		console.log(error.message);
		alert("Something went wrong")
	}
};

export const deleteEvent = (id) => async (dispatch) => {
	try {
		await Delete(id, eventsUrl);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error.message);
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
