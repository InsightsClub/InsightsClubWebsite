import React, { Fragment, useState, useEffect, useContext } from "react";
import "@fontsource/mulish";
import "@fontsource/martel";
import "@fontsource/inter";
import './eventcard.css';
import { Outlet } from "react-router-dom";
import { PopupContext } from "../../../contexts/popupContext";
import EventDetails from "../../DetailEvent/eventDetails";
import axios from "axios";

const eventUrl = "https://api.insights-club-vitb.ml/event";

function EventSlides() {
    const [currentEvent, setCurrentEvent] = useState({});
    const [pastEvent, setPastEvent] = useState({});
    const [upcomingEvent, setUpcomingEvent] = useState({});

    const [eventPage, setEventPage] = useState({});
    const { popupTrigger, setPopupTrigger } = useContext(PopupContext);

    useEffect(() => {
        axios.get(`${eventUrl}/all`)
            .then((res) => {
                const events = res.data.events;
                const _upcoming = events.find(event => event.status === 'upcoming')
                const _ongoing = events.find(event => event.status === 'ongoing')
                const _past = events.find(event => event.status === 'past')
                console.log(_upcoming, _ongoing, _past)

                if (_upcoming != undefined && _upcoming != null)
                    setUpcomingEvent(_upcoming)
                if (_ongoing != undefined && _ongoing != null)
                    setCurrentEvent(_ongoing)
                if (_past != undefined && _past != null)
                    setPastEvent(_past)
            }).catch((err) => {
                console.error(err);
            })
    }, []);

    const slideClickHandler = (arrow) => {
        const slides = document.querySelectorAll('.slides > .slide');
        const noOfSlides = slides.length;
        if (arrow === 'right') {
            for (let i = 0; i < noOfSlides; i++)
                if (slides[i].classList.contains('slide-active')) {
                    slides[i].classList.remove('slide-active');
                    slides[(i + 1) % noOfSlides].classList.add('slide-active');
                    break;
                }
        }
        if (arrow === 'left') {
            for (let i = 0; i < noOfSlides; i++)
                if (slides[i].classList.contains('slide-active')) {
                    slides[i].classList.remove('slide-active');
                    i > 0 ? slides[i - 1].classList.add('slide-active')
                        : slides[noOfSlides - 1].classList.add('slide-active');
                    break;
                }
        }
    }
    if (Object.keys(pastEvent).length > 0 || Object.keys(currentEvent) > 0 || Object.keys(upcomingEvent) > 0)
    return (
        <Fragment>
            <div className="slider">
                <div className="slider-header">
                    <h2 className="slider-heading">Our Events</h2>
                    <span className="slider-subheading">
                        <a href="/events" className="subheading-link">View all</a></span>
                </div>
                <div className="slide-box">
                    <button className="slide-button slide-left"
                        onClick={() => slideClickHandler('left')}>
                    </button>
                    <div className="slides">
                        {Object.keys(pastEvent).length > 0 &&
                            <div className={`slide ${Object.keys(upcomingEvent).length + Object.keys(currentEvent).length === 0 ? "slide-active":""}`}>
                                <div className="slide-info">
                                    <h3 className="slide-heading">Past Event</h3>
                                    <p className="slide-text">
                                        {pastEvent.shortDescription}
                                    </p>
                                    <button className="slide-info-button"
                                        onClick={() => {
                                            setEventPage(pastEvent)
                                            setPopupTrigger(true)
                                        }}>
                                        More info&hellip;
                                    </button>
                                </div>
                                {pastEvent && pastEvent.image &&
                                    <img className="slide-cover" src={pastEvent.image.url} alt="" />
                                }
                            </div>
                        }
                        {Object.keys(currentEvent).length > 0 &&
                            <div className="slide slide-active">
                                <div className="slide-info">
                                    <h3 className="slide-heading">Ongoing Event</h3>
                                    <p className="slide-text">
                                        {currentEvent.shortDescription}
                                    </p>
                                    <button className="slide-info-button"
                                        onClick={() => {
                                            setEventPage(currentEvent)
                                            setPopupTrigger(true)
                                        }}>
                                        Register
                                    </button>
                                </div>
                                {currentEvent && currentEvent.image &&
                                    <img className="slide-cover" src={currentEvent.image.url} alt="" />
                                }
                            </div>
                        }
                        {Object.keys(upcomingEvent).length > 0 &&
                            <div className={`slide ${Object.keys(currentEvent).length === 0 ? "slide-active":""}`}>
                                <div className="slide-info">
                                    <h3 className="slide-heading">Upcoming Event</h3>
                                    <p className="slide-text">
                                        {upcomingEvent.shortDescription}
                                    </p>
                                    <button className="slide-info-button"
                                        onClick={() => {
                                            setEventPage(upcomingEvent)
                                            setPopupTrigger(true)
                                        }}
                                    >Get updates
                                    </button>
                                </div>
                                {upcomingEvent && upcomingEvent.image &&
                                    <img className="slide-cover" src={upcomingEvent.image.url} alt="" />
                                }
                            </div>
                        }
                    </div>
                    <button className="slide-button slide-right"
                        onClick={() => slideClickHandler('right')}>
                    </button>
                </div>
            </div>
            {
                popupTrigger ? (
                    <div className="popup">
                        <EventDetails event={eventPage} />
                    </div>
                ) : (
                    ""
                )
            }
            <Outlet />
        </Fragment>
    );
    else
        return null;
}

export default EventSlides;
