import React, { useEffect, useState } from "react";
import "./eventsPageStyles.scss";
import EventsContainer from "../../components/events/eventsContainer";
import {
	getOngoingEvents,
	getPastEvents,
  getUpcomingEvents,
} from "../../actions/events";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import newEventLogo from "../../assets/newEvent.svg";
import { useCookies } from "react-cookie";

const EventsPage = () => {
	const [eventType, setEventType] = useState("Past");
  const [cookies] = useCookies(["user"]);
  // console.log("cookies: ", cookies);
  const dispatch = useDispatch();

	useEffect(() => {
		if (eventType === "Ongoing") {
			dispatch(getOngoingEvents());
		} else if (eventType === "Upcoming") {
			dispatch(getUpcomingEvents());
		} else if (eventType === "Past") {
			dispatch(getPastEvents());
		}
	}, [dispatch, eventType]);

  const events = useSelector((state) => state.events);

	return (
    <>
      <div className="events">
        <div className="content">
          <div className="topDiv">
            <h1>Our Events</h1>
            {(
              cookies.hasOwnProperty("user") &&
              Object.keys(cookies.user).length !== 0 && cookies.user.isAdmin
            ) ? (
              <Link to={"newEvent"}>
                <h4>Add Event</h4>
                <div>
                  <img src={newEventLogo} alt="svgLogo" />
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="pageContainer">
            <div className="divButtons">
              <button
                style={{
                  backgroundColor: eventType === "Upcoming" ? "#FFC776" : "",
                  border:
                    eventType === "Upcoming" ? "1px solid #B9B9B9" : "0px",
                }}
                onClick={() => setEventType("Upcoming")}
              >
                Upcoming events
              </button>

              <button
                style={{
                  backgroundColor: eventType === "Ongoing" ? "#FFC776" : "",
                  border: eventType === "Ongoing" ? "1px solid #B9B9B9" : "0px",
                }}
                onClick={() => setEventType("Ongoing")}
              >
                Ongoing events
              </button>

              <button
                style={{
                  backgroundColor: eventType === "Past" ? "#FFC776" : "",
                  border: eventType === "Past" ? "1px solid #B9B9B9" : "0px",
                }}
                onClick={() => setEventType("Past")}
              >
                Past events
              </button>
            </div>

            <div className="bottomEventContainer">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventsContainer key={event._id} event={event} />
                ))
              ) : (
                <h2 style={{ textAlign: "center" }}>No {eventType} Events</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
