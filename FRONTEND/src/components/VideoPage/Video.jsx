import React, { Fragment, useState, useEffect } from "react";
import "@fontsource/mulish";
import "@fontsource/martel";
import "@fontsource/inter";
import './video.css';
import Footer from "../Footer/Footer";
import axios from "axios";
import { Outlet } from "react-router-dom";


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
          .get("https://api.insights-club-vitb.ml/video/all")
          .then((data) => {
            setVideos(data.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .then(() => {
            console.log("Videos fetched successfully !!");
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
            <Outlet />
        </Fragment>
    );
}

export default Video;
