import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import CategoryForm from "./_CategoryForm";
import { Grid } from "semantic-ui-react";

function EditCategory(props) {
	const [userid, setUserid] = useState(props.userid);
	const [error, setError] = useState(false);
	const [categories, setCategories] = useState([]);
	const category = props.location.state.category;

	useEffect(() => {
		setUserid(props.userid);
		if (userid != null) {
			const requestCategories = async () => {
				const response = await fetch("/api/categories?filter[userid]=" + userid);
				const { data } = await response.json();
				setCategories(data.map(cat => cat.attributes.name));
			};
			requestCategories();
		}
	}, [userid, props]);

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
				navigate("/home");
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
			name: category.attributes.name,
			userid: userid
		}
	};

	return (
		<div>
			<Grid padded>
				<Grid.Column>
					<h2>Rename Category</h2>
					{CategoryForm(categories, formikValues, handleSubmit, error)}
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default EditCategory;
