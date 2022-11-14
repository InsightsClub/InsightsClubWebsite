import React, { useContext, useEffect } from 'react';
import { EventDataContext } from '../../contexts/eventDataContext';
import './eventDetails.styles.scss';
import { PopupContext } from '../../contexts/popupContext';

const EventDetails = ({ eventData, time, date, month }) => {

  const { setPopupTrigger } = useContext(PopupContext);

  const { setButtonText, setCheckButton } = useContext(EventDataContext);

  useEffect(() => {
    const checkConditions = () => {
      if (eventData.status !== "upcoming") {
        setCheckButton(true);
      }

      if (eventData.status === "past") {
        setButtonText("View");
      } else {
        setButtonText("Register");
      }
    };
    checkConditions();
  }, []);

  return (
    <div className="detailMainContainer">
      <svg
        onClick={() => setPopupTrigger(false)}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        width="48px"
        height="48px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
      </svg>
      <div className="imgContainer">
        <img src={eventData.image?.url} alt="" />
        <div className="date">
          {date} {month}
        </div>
      </div>

      <div className="eventDetailsContainer">
        <div className="topdetails">
          <h2>{eventData.title}</h2>
          {eventData.status !== "past" ? (
            <div className="time">{time}</div>
          ) : (
            ""
          )}
        </div>
        <p>{eventData.description}</p>
        {eventData?.status === "past" && eventData.winners?.length > 0 ? (
          <div className="winnerContainer">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M868 160h-92v-40c0-4.4-3.6-8-8-8H256c-4.4 0-8 3.6-8 8v40h-92a44 44 0 0 0-44 44v148c0 81.7 60 149.6 138.2 162C265.6 630.2 359 721.8 476 734.5v105.2H280c-17.7 0-32 14.3-32 32V904c0 4.4 3.6 8 8 8h512c4.4 0 8-3.6 8-8v-32.3c0-17.7-14.3-32-32-32H548V734.5C665 721.8 758.4 630.2 773.8 514 852 501.6 912 433.7 912 352V204a44 44 0 0 0-44-44zM248 439.6c-37.1-11.9-64-46.7-64-87.6V232h64v207.6zM840 352c0 41-26.9 75.8-64 87.6V232h64v120z"></path>
            </svg>
            <span>{eventData?.winners.toString().split(",").join(", ")}</span>
          </div>
        ) : (
          ""
        )}
        <div className="bottomdetails">
          <div className="modeVenue">
            <div className="mode">Mode: {eventData.mode}</div>
            {eventData?.status !== "past" && eventData?.mode !== "Online" ? (
              <div className="venue">Venue: {eventData.venue}</div>
            ) : (
              ""
            )}
          </div>
          {eventData?.status === "past" ? (
            <a className="buttonClass" href={eventData.link}>
              View
            </a>
          ) : (
            <a className="buttonClass" href={eventData.link}>
              Register
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails

