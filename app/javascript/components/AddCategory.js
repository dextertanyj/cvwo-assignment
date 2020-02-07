import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import CategoryForm from "./_CategoryForm";
import { Grid } from "semantic-ui-react";

function AddCategory(props) {
	// userid state is not immediately available sometimes for Effect hook.
	// Declare as state so useEffect will updated when userid is available.
	const [userid, setUserid] = useState(props.userid);
	const [error, setError] = useState(false);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		if (userid != null) {
			const requestCategories = async () => {
				const response = await fetch("/api/categories?filter[userid]=" + userid);
				const { data } = await response.json();
				setCategories(data.map(cat => cat.attributes.name));
			};
			requestCategories();
		}
	}, [userid]);

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
				navigate("/home");
			} else if (response.status === 422) {
				setError(true);
			}
		};
		requestCategories();
	};

	const formikValues = {
		type: "categories",
		attributes: {
			name: "",
			userid: userid
		}
	};

	return (
		<div>
			<Grid padded>
				<Grid.Column>
					<h2>Add A New Category</h2>
					{CategoryForm(categories, formikValues, handleSubmit, error)}
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default AddCategory;
