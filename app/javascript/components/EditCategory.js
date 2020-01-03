import React, { useState } from "react";
import { navigate } from "@reach/router";
import CategoryForm from "./_CategoryForm";
import { Grid } from 'semantic-ui-react';

function EditCategory(props) {

	const [error, setError] = useState(false);
	const category = props.location.state.category;

	const handleSubmit = values => {
		const requestCategories = async () => {
			const response = await fetch("/api/categories/" + category.id, {
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
		requestCategories();
	};

	const formikValues = {
		type: "categories",
		id: category.id,
		attributes: {
			name: category.attributes.name
		}
	}

	return (
		<div>
		<Grid padded>
			<Grid.Column>
				<h2>Rename Category</h2>
				{ CategoryForm(formikValues, handleSubmit, error) }
			</Grid.Column>
			</Grid>
		</div>
	);
}

export default EditCategory;