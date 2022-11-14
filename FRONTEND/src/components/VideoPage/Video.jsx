import React, { Fragment, useState, useEffect } from "react";
import "@fontsource/mulish";
import "@fontsource/martel";
import "@fontsource/inter";
import './video.css';
import Footer from "../Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";


function EmbeddedVideo({ video }) {
    return (
        <iframe src={video.embedLink} className="video-player"
            frameBorder="0" title={video.title} allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
    );
}


function Video() {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrent] = useState(0); // store index of current video from array
    const [cookies] = useCookies(["user"]);


    const slideClickHandler = (arrow) => {
        if (arrow === 'right') {
            setCurrent((currentVideo + 1) % videos.length);
        }
        if (arrow === 'left') {
            currentVideo === 0 ? setCurrent(videos.length - 1) : setCurrent(currentVideo - 1);
        }
    }

    useEffect(() => {
        // fetch all video from database
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/video/all`)
            .then((data) => {
                setVideos(data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    return (
        <Fragment>
            {/* Video slider */}
            <div className="video-area">
                {
                    videos.length !== 0 ? <EmbeddedVideo video={videos[currentVideo]} /> : ''
                }
                <div className="button-group">
                    <button className="prev-button"
                        onClick={() => slideClickHandler('left')}>
                        Previous
                    </button>
                    <button className="next-button"
                        onClick={() => slideClickHandler('right')}>
                        Next
                    </button>
                </div>
            </div>

            {
                cookies.hasOwnProperty("user")
                && Object.keys(cookies.user).length !== 0
                && (cookies.user.isCoAdmin || cookies.user.isAdmin) &&
                <Link to="new" className="add-videos-button">
                    <svg width="48px" height="48px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                    </svg>
                </Link>
            }

            {/* Video Details */}
            <div className="video-info">
                <div className="video-text">
                    <h4 className="video-title">
                        {
                            videos[currentVideo] ? videos[currentVideo].title : 'Video Title'
                        }
                    </h4>
                    <p className="video-description">
                        {
                            videos[currentVideo] ? videos[currentVideo].description : 'Video Description'
                        }
                    </p>
                </div>
                {
                    videos[currentVideo] && videos[currentVideo].thumbnail ?
                        <img className="video-thumb" src={videos[currentVideo].thumbnail} alt="" />
                        : ''
                }
            </div>
            <Footer />
        </Fragment>
    );
}

export default Video;
