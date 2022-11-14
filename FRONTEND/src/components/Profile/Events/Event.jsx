import React, { useState } from "react";
import "./Event.css";

function Event({ event }) {
	const [registered, setRegistered] = useState(false);
	return (
		<>
			<div className='profile-event-container'>
				<div className='profile-event-header'>
					<p className='profile-event-header-name'>{event.eventName}</p>

					<div className='profile-date'>
						<p className='profile-b'>{event.time}</p>
						<p className='profile-b-date'>{event.date}</p>
					</div>
				</div>

				<div className='profile-event-main'>
					<p className='profile-event-main-content'>{event.description}</p>
				</div>
				<div className='profile-event-footer'>
					<div className='profile-footer'>
						<div className='profile-mode'>
							<p>Mode: {event.mode}</p>
						</div>

						<div className='profile-mode'>
							<p>Venue: {event.venue}</p>
						</div>
					</div>
					<div className='profile-footer-button'>
						<button
							className='profile-event-register-button'
							style={{
								background: registered ? "#5FCA64" : "#FFFFFF",
								color: registered ? "#FFFFFF" : "#5FCA64",
							}}
							onClick={() => setRegistered(true)}>
							<p className='profile-r '>
								{registered ? "Registered" : "Register"}
							</p>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Event;

