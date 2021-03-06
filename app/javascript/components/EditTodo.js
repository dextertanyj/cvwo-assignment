import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import TimezoneFix from "./_TimezoneFix";
import TodoForm from "./_TodoForm";
import { Grid } from "semantic-ui-react";

function EditTodo(props) {
	const [userid, setUserid] = useState(props.userid);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const todo = props.location.state.todo;

	useEffect(() => {
		setUserid(props.userid);
		if (userid != null) {
			const requestCategories = async () => {
				const response = await fetch("/api/categories?filter[userid]=" + userid);
				const { data } = await response.json();
				setCategories(data);
			};
			requestCategories();
		}
	}, [userid]);

	const handleSubmit = values => {
		// Fix unwanted utc offset from form.
		if (values.attributes.duedate != "") {
			values.attributes.duedate = TimezoneFix(values.attributes.duedate);
		}
		// Change value of categoryid of all from -1 to null
		// as database expects null for todo with no category.
		if (values.attributes.categoryid == "-1") {
			values.attributes.categoryid = null;
		}
		const requestTodos = async () => {
			const response = await fetch("/api/todos/" + todo.id, {
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/vnd.api+json"
				},
				body: JSON.stringify({ data: values })
			});
			// Reset erorr state to false upon submission of form.
			setError(false);
			if (response.ok) {
				navigate("/home");
			} else if (response.status === 422) {
				setError(true);
			}
		};
		requestTodos();
	};

	console.log(todo.attributes.duedate);

	// Set orignal form values based on selected todo.
	const formikValues = {
		type: "todos",
		id: todo.id,
		attributes: {
			title: todo.attributes.title,
			description: todo.attributes.description,
			categoryid: todo.attributes.categoryid,
			userid: userid,
			// If duedate is null entry, replace with empty string as form does not handle null well.
			// Otherwise, convert duedate to date type for form to handle.
			duedate: todo.attributes.duedate == null ? "" : new Date(todo.attributes.duedate),
			completed: todo.attributes.completed
		}
	};

	return (
		<div>
			<Grid padded>
				<Grid.Column>
					<h2>Edit Todo</h2>
					{TodoForm(formikValues, handleSubmit, categories, error)}
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default EditTodo;
