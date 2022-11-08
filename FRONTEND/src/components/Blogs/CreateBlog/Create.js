import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Create.css";
import { createBlogs } from "../../../actions/blogs";
import Navbar from "../../Navbar/Navbar.jsx";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const Create = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const [cookie] = useCookies();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState("");
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!params.id) return;
		getBlog();
	});

	const getBlog = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: `${process.env.REACT_APP_BACKEND_URL}/blog/${params.id}`,
			});

			if (response.status === (200 || 304)) {
				if (cookie.user.id !== response.data.blog.author._id) {
					return;
				} else {
					setTitle(response.data.blog.title);
					setContent(response.data.blog.content);

					const contentBlock = htmlToDraft(response.data.blog.content);
					const contentState = ContentState.createFromBlockArray(
						contentBlock.contentBlocks
					);
					const editorState = EditorState.createWithContent(contentState);

					setEditorState(editorState);
				}
			} else {
				setError(`Unable to retrieve blog`);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const postBlog = async (e) => {
		e.preventDefault();
		if (title === "" || content === "") {
			setError("Please fill out all fields.");
			return null;
		}
		setSaving(true);
		const data = {
			title,
			description,
			tags: tags.split(" "),
			content,
		};
		try {
			dispatch(createBlogs(data));
		} catch (error) {
			setError(error.message);
		} finally {
			setSaving(false);
		}
		console.log("error: " + error);
		navigate("/profile");
	};

	return (
		<div className='create-blog-main-container'>
			<Navbar />
			<p className='create-blog-heading'>Create Your Blog</p>
			<div className='create-blog-form-group'>
				<form>
					<label className='create-blog-title'>Title:</label>
					<br />
					<input
						type='text'
						name='title'
						value={title}
						id='title'
						placeholder='Enter a title'
						disabled={saving}
						onChange={(event) => {
							setTitle(event.target.value);
						}}
					/>
				</form>
				<form>
					<label className='create-blog-description'>Description:</label>
					<input
						type='text'
						name='description'
						value={description}
						id='description'
						placeholder='Enter a short description'
						disabled={saving}
						onChange={(event) => {
							setDescription(event.target.value);
						}}
					/>
				</form>
				<form>
					<label>Content</label>
					<Editor
						editorState={editorState}
						wrapperClassName='card'
						editorClassName='card-body'
						onEditorStateChange={(newState) => {
							setEditorState(newState);
							setContent(
								draftToHtml(convertToRaw(newState.getCurrentContent()))
							);
						}}
						toolbar={{
							options: [
								"inline",
								"blockType",
								"fontSize",
								"list",
								"textAlign",
								"history",
								"embedded",
								"emoji",
								"image",
							],
							inline: { inDropdown: true },
							list: { inDropdown: true },
							textAlign: { inDropdown: true },
							link: { inDropdown: true },
							history: { inDropdown: true },
						}}
					/>
				</form>
				<form>
					<label className='create-blog-headline'>Tags: </label>
					<input
						type='text'
						name='tags'
						value={tags}
						id='tags'
						placeholder='Enter a tags with spaces'
						disabled={saving}
						onChange={(event) => {
							setTags(event.target.value);
						}}
					/>
				</form>
				<form>
					<button
						className='create-blog-post-button'
						onClick={(e) => postBlog(e)}>
						Publish
					</button>
				</form>
			</div>

			<form className='create-blog-preview'>
				<label>Preview</label>
				<div className='create-blog-preview-body'>
					<div
						dangerouslySetInnerHTML={{
							__html: content,
						}}
					/>
				</div>
			</form>
			{error !== "" && (
				<p className='createBlog-error'>{alert("Error : " + error)}</p>
			)}
		</div>
	);
};

export default Create;
