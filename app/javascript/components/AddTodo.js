import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import TimezoneFix from "./_TimezoneFix";
import TodoForm from "./_TodoForm";
import { Grid } from "semantic-ui-react";

function AddTodo(props) {
	const [userid, setUserid] = useState(props.userid);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);

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
		// Change value of categoryid of all from -1 to null.
		if (values.attributes.categoryid == "-1") {
			values.attributes.categoryid = null;
		}
		const requestTodos = async () => {
			const response = await fetch("/api/todos", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/vnd.api+json"
				},
				body: JSON.stringify({ data: values })
			});
			setError(false);
			if (response.status === 201) {
				navigate("/home");
			} else if (response.status === 422) {
				setError(true);
			}
		};
		requestTodos();
	};

	const formikValues = {
		type: "todos",
		attributes: {
			title: "",
			description: "",
			duedate: "",
			completed: "false",
			categoryid: null,
			userid: userid
		}
	};

	return (
		<div>
			<Grid padded>
				<Grid.Column>
					<h2>Add A New Todo</h2>
					{TodoForm(formikValues, handleSubmit, categories, error)}
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default AddTodo;
