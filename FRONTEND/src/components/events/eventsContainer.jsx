import React, { useContext} from 'react';
import './eventContainerStyles.scss';
import EventDetails from '../DetailEvent/eventDetails';
import { PopupContext } from '../../contexts/popupContext';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

const monthText = (num) => {
  switch (num) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "July";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      break;
  }
}

const EventsContainer = ({ event }) => {
  const [cookies] = useCookies(["user"]);
  const { popupTrigger, setPopupTrigger, eventData, setEventData } =
    useContext(PopupContext);
  var time = event.date.substr(11, 5);
  var date = event.date.substr(8, 2);
  var month = event.date.substr(5, 2);
  month = parseInt(month);

  event.shortdescription = event.description.substring(0, 100);

  return (
    <>
      <div
        onClick={() => {
          setPopupTrigger(true);
          setEventData(event);
        }}
        className="event-container"
      >
        <div className="left">
          <img src={event.image.url} alt="eventImage" />
        </div>

        <div className="right">
          <div className="firstdetails">
            <h2>{event.title}</h2>
            {event.status !== "past" ? <div className="time">{time}</div> : ""}
          </div>
          <p>{event.shortdescription}......</p>
          <div className="lastdetails">
            <div className="modeVenue">
              <div className="mode">Mode: {event.mode}</div>
              {event.mode !== "Online" ? (
                <div className="venue">Venue: {event.venue}</div>
              ) : (
                ""
              )}
              {(cookies.hasOwnProperty("user") &&
                Object.keys(cookies.user).length !== 0 && cookies.user.isAdmin) ?
                (
                  <div className="edit-delete" style={{ margin: "20px" }}>
                    <Link
                      to={`/event/edit/${event._id}`}
                      state={{ data: event }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button>Edit</button>
                    </Link>
                  </div>
                ) : ""}
            </div>
            <div className="date">
              {date} {monthText(month)}
            </div>
          </div>
        </div>
      </div>
      {popupTrigger ? (
        <div className="popup">
          <EventDetails
            eventData={eventData}
            time={time}
            date={date}
            month={monthText(month)}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default EventsContainer;

