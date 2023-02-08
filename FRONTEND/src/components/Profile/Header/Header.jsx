import React from "react";
import "./Header.css";
import { BsPencilFill } from "react-icons/bs";

function Header({ user }) {
	const uploadedImage = React.useRef(null);
	const imageUploader = React.useRef(null);

	const handleImageUpload = (e) => {
		const [file] = e.target.files;
		if (file) {
			const reader = new FileReader();
			const { current } = uploadedImage;
			current.file = file;
			reader.onload = (e) => {
				current.src = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<div className='Header-upper-container'></div>

			<img ref={uploadedImage} className='Header-profile-photo' alt='profile' />
			<div className='pen'>
				<input
					type='file'
					id='img'
					onChange={handleImageUpload}
					accept='image/*'
					ref={imageUploader}
				/>
				<BsPencilFill />
			</div>
			<div className='header-profile-name'>
				<p>{"Jon Wic"}</p>
			</div>
			<div className='Header-profile-line'></div>
		</>
	);
}

export default Header;
