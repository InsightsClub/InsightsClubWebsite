import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './newEvent.styles.scss'
import { clearErrors, createEvents, updateEvent } from '../../actions/events';
import { NEW_EVENT_RESET, UPDATE_EVENT_RESET } from '../../constants/eventsActionTypes';
import { useLocation } from 'react-router-dom';

const EditEvent = () => {

  const location = useLocation();
  const eventData = location?.state?.data;

  const dispatch = useDispatch();
  
  const { error, success } = useSelector((state) => state.newEvent);

  const [values, setValues] = useState(eventData);

  const [image, setImage] = useState([]);

  useEffect(() => {
    if (error) {
      alert("Something went wrong");
      console.log(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Event updated successfully");
      dispatch({ type: UPDATE_EVENT_RESET });
    }
  }, [dispatch, error, success]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }


  // Convert image to base 64
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

    const handleSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("title", values.title);
      myForm.set("shortDescription", values.shortDescription);
      myForm.set("description", values.description);
      myForm.set("date", values.date);
      myForm.set("domain", values.domain);
      myForm.set("department", values.department);
      myForm.set("status", values.status);
      myForm.set("mode", values.mode);
      myForm.set("venue", values.venue);
      // myForm.set("image", image);

        
      dispatch(updateEvent(eventData._id, myForm));
    };

  return (
    <div className="form-main-container">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Event name"
          value={values.title}
        />
        <input
          onChange={handleChange}
          type="datetime-local"
          placeholder="Date"
          value={values.date}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Short Description"
          value={values.shortDescription}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Description"
          value={values.description}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Domain"
          value={values.domain}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Department"
          value={values.department}
        />
        <label htmlFor="mode">Mode</label>
        <select
          onChange={handleChange}
          name="mode"
          id="mode"
          value={values.mode}
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <label htmlFor="status">Status</label>
        <select
          onChange={handleChange}
          name="status"
          id="status"
          value={values.status}
        >
          <option value="past">Past Event</option>
          <option value="upcoming">Upcoming Event</option>
          <option value="ongoing">Ongoing Event</option>
        </select>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Venue"
          value={values.venue}
        />
        {/* <input
          onChange={handleFileInputChange}
          type="file"
          placeholder="image"
        /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditEvent;
