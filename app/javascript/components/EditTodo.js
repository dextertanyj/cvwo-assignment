import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";
import { Datepicker } from 'react-formik-ui';

function EditTodo(props) {

	const [categories, setCategories] = useState([]);
	const todo = props.location.state.todo;

	// Retrives UTC offset of the browser
	const utcOffset = new Date().getTimezoneOffset();
	const utcOffsetHours = utcOffset / 60;

	// Adjusts datetime to remove any UTC offset
	function timezonefix(datetime) {
		if (utcOffsetHours <= 0) {
			datetime.setHours(Math.abs(utcOffsetHours));
		} else {
			datetime.setDate(datetime.getDate() - 1);
			datetime.setHours(utcOffsetHours);
		}
		return datetime;
	}

	useEffect(() => {
		const csrfToken = document.querySelector("meta[name=csrf-token]").content;
		const requestCategories = async () => {
			const response = await fetch("/api/categories", {headers: {"X-CSRF-Token": csrfToken}});
			const { data } = await response.json();
			setCategories(data);
		};
		requestCategories();
	}, []);

	const handleSubmit = values => {
		// Fix unwanted utc offset from form.
		if (values.attributes.duedate != "") {
			values.attributes.duedate = timezonefix(values.attributes.duedate);
		}
		const requestTodos = async () => {
		// We get the CSRF token generated by Rails to send it
		// as a header in the request to create a new post.
		// This is needed because with this token, Rails is going to
		// recognize the request as a valid request
		const csrfToken = document.querySelector("meta[name=csrf-token]").content;
		const response = await fetch("/api/todos/" + todo.id, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/vnd.api+json",
				"X-CSRF-Token": csrfToken
			},
			body: JSON.stringify({ data: values })
		});
		if (response.ok) {
			navigate("/");
			}
		};
	requestTodos();
	};
	
	const initialTitle = todo.attributes.title;
	const initialDescription = todo.attributes.description;
	const initialStatus = todo.attributes.completed;
	const initialDate = todo.attributes.duedate;
	const initialCategory = todo.attributes.categoryid;

	const formikValues = {
		type: "todos",
		id: todo.id,
		attributes: {
			title: initialTitle,
			description: initialDescription,
			categoryid: initialCategory,
			duedate: initialDate,
			completed: initialStatus
		}
	}

	return (
		<div>
			<h2>Edit Todo</h2>
			<Formik
			initialValues={formikValues}
			onSubmit={handleSubmit}
			>
				<Form>
				<label for="attributes.title">Title</label>
				<Field type="text" name="attributes.title" />
				<br />
				<label for="attributes.description">Description</label>
				<Field type="text" name="attributes.description" />
				<br />
				<label for="attributes.duedate">Due Date</label>
				<Datepicker name="attributes.duedate" isClearable />
				<label for="attributes.categoryid">Category</label>
				<Field name="attributes.categoryid" as="select">
					<option value={null}>All</option>
					{categories.map(category => <option value={category.id}>{category.attributes.name}</option>)}
				</Field>
				<br />
				<button type="submit">Update</button>
				</Form>
			</Formik>
		</div>
	);
}

export default EditTodo;