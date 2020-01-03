import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import TimezoneFix from './_TimezoneFix';
import TodoForm from './_TodoForm';
import { Grid } from 'semantic-ui-react';

function EditTodo(props) {

	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const todo = props.location.state.todo;

	useEffect(() => {
		const requestCategories = async () => {
			const response = await fetch("/api/categories");
			const { data } = await response.json();
			setCategories(data);
		};
		requestCategories();
	}, []);

	const handleSubmit = values => {
		// Fix unwanted utc offset from form.
		if (values.attributes.duedate != "") {
			values.attributes.duedate = TimezoneFix(values.attributes.duedate);
		}
		// Change value of categoryid of all from -1 to null.
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
			setError(false);
			if (response.ok) {
				navigate("/");
			} else if (response.status === 422) {
				setError(true);
			}
		};
		requestTodos();
	};

	const formikValues = {
		type: "todos",
		id: todo.id,
		attributes: {
			title: todo.attributes.title,
			description: todo.attributes.description,
			categoryid: todo.attributes.categoryid,
			duedate: new Date(todo.attributes.duedate),
			completed: todo.attributes.completed
		}
	}

	return (
		<div>
			<Grid padded>
				<Grid.Column>
					<h2>Edit Todo</h2>
						{ TodoForm(formikValues, handleSubmit, categories, error) }
					</Grid.Column>
			</Grid>
		</div>
	);
}

export default EditTodo;