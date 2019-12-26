import React from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function AddTodo() {
	const handleSubmit = values => {
		const requestTodos = async () => {
		// We get the CSRF token generated by Rails to send it
		// as a header in the request to create a new post.
		// This is needed because with this token, Rails is going to
		// recognize the request as a valid request
		const csrfToken = document.querySelector("meta[name=csrf-token]").content;
		const response = await fetch("/api/todos", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/vnd.api+json",
				"X-CSRF-Token": csrfToken
			},
			body: JSON.stringify({ data: values })
		});
		if (response.status === 201) {
			navigate("/");
		}
	};
	requestTodos();
};

	return (
		<div>
			<h2>Add A New Todo</h2>
			<Formik
			initialValues={{
				type: "todos",
				attributes: {
					title: "",
					description: "",
					completed: "false"
				}
			}}
			onSubmit={handleSubmit}
			>
				<Form>
				<Field type="text" name="attributes.title" />
				<Field type="text" name="attributes.description" />

				<button type="submit">Create</button>
				</Form>
			</Formik>
		</div>
	);
}

export default AddTodo;