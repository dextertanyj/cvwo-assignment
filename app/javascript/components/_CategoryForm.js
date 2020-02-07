import React from "react";
import { Formik, Field } from "formik";
import { Form, Button, Message } from "semantic-ui-react";

function CategoryForm(categories, formikValues, handleSubmit, error) {
	let errormsg = "Category name cannot be blank.";

	// Validate if the category name has been used previously.
	function validateName(value) {
		error = null;
		if (value === "All") {
			error = true;
			errormsg = '"All" has been reserved by the system. Please choose another name.';
		} else if (categories.filter(name => name == value).length > 0) {
			error = true;
			errormsg = '"' + value + '" already exists. Please choose another name.';
		}
		return error;
	}

	return (
		<Formik initialValues={formikValues} onSubmit={handleSubmit}>
			{props => (
				<Form onSubmit={props.handleSubmit}>
					<Form.Field>
						<Field type="text" name="attributes.name" required={true} validate={validateName} />
					</Form.Field>
					{error && (
						<Message negative>
							<Message.Header>{errormsg}</Message.Header>
						</Message>
					)}
					<Button type="submit">{formikValues.id ? "Update" : "Create"}</Button>
				</Form>
			)}
		</Formik>
	);
}

export default CategoryForm;
