import React, { useRef } from "react";
import Navbar from "../nav/Navbar";
import style from "../Form/form.module.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Form = () => { 

	const inputFirstName = useRef();
	const inputLastName = useRef();
	const inputLocation = useRef();
	const inputPhoto = useRef();

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({});

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	const formSubmitHadler = async (event) => {
		event.preventDefault();

		const submittedData = {
			firstname: inputFirstName.current.value,
			lastname: inputLastName.current.value,
			location: inputLocation.current.value,
		};

		const formData = new FormData();

		formData.append("data", JSON.stringify(submittedData));
		
		Array.from(inputPhoto.current.files).forEach((file) => {
			formData.append("files.photo", file, file.name);
		});

		const res = await axios.post("https://fejs-c7-api.herokuapp.com/api/students/", formData);
		console.log(res.data);
	};

	return (
		<>
			<Navbar />
			<form onSubmit={formSubmitHadler} className="mx-5 my-5">
				<div className="my-3">
					<label htmlFor="">First Name</label>
					<input type="text" name="firstname" id="firstname" ref={inputFirstName}></input>
				</div>
				<div className="my-3">
					<label htmlFor="">Last Name</label>
					<input type="text" name="lastname" id="lastname" ref={inputLastName}></input>
				</div>
				<div className="my-3">
					<label htmlFor="">Location</label>
					<input type="text" name="location" id="location" ref={inputLocation}></input>
				</div>
				<div className="my-3">
					<label htmlFor="">Picture</label>
					<input type="file" name="photo" id="photo" ref={inputPhoto}></input>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						{isDragActive ? <p>Drop Your File</p> : <p>Drop Your File here</p>}
					</div>
					<ul>{files}</ul>
				</div>
				<div>
					<input type="submit" value="SUBMIT FORM" className={`${style.buttons} mt-4`} />
				</div>
			</form>
		</>
	);
};

export default Form;
