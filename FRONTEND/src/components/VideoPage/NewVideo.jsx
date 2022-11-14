import React, { useState } from "react";
import "@fontsource/mulish";
import "@fontsource/inter";
import './newVideo.css';
import axios from "axios";

function NewVideo() {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [embed, setEmbed] = useState("")
    const [image, setImage] = useState([])

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        // convert image to base 64
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (embed.trim() === "")
            alert("Provide an embed link !!")
        if (title.trim() === "")
            alert("Provide a title !!")

        const myForm = new FormData()

        myForm.set("title", title)
        myForm.set("description", desc)
        myForm.set("embedLink", embed)
        myForm.set("thumbnail", image)

        await axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/video/new`,
                myForm,
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((data) => {
                console.log(data)
                alert("Video added successfully !!")
            })
            .catch((err) => {
                console.error(err)
                alert("Something went wrong!")
            })
    };

    return (
        <div className="video-form">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Video name"
                />
                <textarea
                    onChange={(e) => setDesc(e.target.value)}
                    type="text"
                    placeholder="Video description"
                />
                <input
                    onChange={(e) => setEmbed(e.target.value)}
                    type="text"
                    placeholder="Embed URL (src value of iframe)"
                />
                <label htmlFor="imageInput">Cover photo (prefer 1:1 resolution):</label>
                <input
                    id ="imageInput"
                    onChange={handleFileInputChange}
                    type="file"
                    placeholder="image"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewVideo
