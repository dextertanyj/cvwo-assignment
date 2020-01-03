import React, { useState } from "react";
import { navigate } from "@reach/router";
import CategoryForm from "./_CategoryForm";
import { Grid } from 'semantic-ui-react'

function AddCategory () {

	const [error, setError] = useState(false);

	const handleSubmit = values => {
		const requestCategories = async () => {
			const response = await fetch("/api/categories", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/vnd.api+json"
				},
				body: JSON.stringify({ data: values })
			});
			setError(false); // Reset error state to allow reflash error message
			if (response.status === 201) {
				navigate("/");
			} else if (response.status === 422) {
				setError(true)
			}
		};
		requestCategories();
	};

	const formikValues = {
		type: "categories",
		attributes: {
			name: ""
		}
	}

	return (
		<div>
			<Grid padded>
				<Grid.Column>
					<h2>Add A New Category</h2>
					{ CategoryForm(formikValues, handleSubmit, error) }
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default AddCategory;