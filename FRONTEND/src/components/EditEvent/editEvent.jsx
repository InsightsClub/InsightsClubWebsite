import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './newEvent.styles.scss'
import { clearErrors, updateEvent } from '../../actions/events';
import { UPDATE } from '../../constants/eventsActionTypes';
import { useLocation } from 'react-router-dom';

const EditEvent = () => {

  const location = useLocation();
  const eventData = location?.state?.data;

  // console.log(eventData)

  const dispatch = useDispatch();
  

  const [status, setStatus] = useState(eventData.status);
  const [link, setLink] = useState(eventData.link);
  const [winners, setWinners] = useState("");



    const handleSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("status", status);
      myForm.set("link", link);

      let winnerArray = winners?.length > 0 ?  winners?.split(",") : [];

      myForm.set("winners", winnerArray);

        
      dispatch(updateEvent(eventData._id, myForm));


    };

  return (
    <div className="form-main-container">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event name"
          value={eventData.title}
          disabled
        />

        <label htmlFor="status">Status</label>
        <select
          onChange={(e) => setStatus(e.target.value)}
          name="status"
          id="status"
          value={status}
        >
          <option value="past">Past Event</option>
          <option value="upcoming">Upcoming Event</option>
          <option value="ongoing">Ongoing Event</option>
        </select>
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {eventData?.winners.length > 0 ? (
          <input
            type="text"
            placeholder="Winners"
            value={eventData?.winners.map((w) => `${w}`)}
            disabled
          />
        ) : (
          <input
            type="text"
            placeholder="Winners"
            value={winners}
            onChange={(e) => setWinners(e.target.value)}
          />
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditEvent;
