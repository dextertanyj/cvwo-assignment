import React from "react";
import { Formik } from "formik";
import { Datepicker } from 'react-formik-ui';
import { 
	Form, 
	Button, 
	Input, 
	Dropdown, 
	TextArea, 
	Message 
} from 'semantic-ui-react';

function _TodoForm (formikValues, handleSubmit, categories, error) {

	// Define custom input for Datepicker
	const CustomInput = ({ value, onClick, onChange }) => (
		<Form.Field>
			<label>Due Date</label>
			<Input value={ value } onClick={ onClick } onChange={ onChange } />
		</Form.Field>
	);

	// Generate options list from categories
	const options = categories.map(category => ({
		key: category.id, 
		text: category.attributes.name, 
		value: category.id 
	}));
	options.unshift({ key: -1, text: "All", value: -1});
	
	return (
		<Formik
		initialValues = { formikValues }
		onSubmit = { handleSubmit }
		>
		{props => (
			<Form onSubmit={ props.handleSubmit }>
				<Form.Field>
					<label>Title</label>
					<Input 
						name = "attributes.title"
						placeholder = "Title"
						defaultValue = { formikValues.attributes.title }
						onChange = {(e, { value } ) => {props.setFieldValue(
							"attributes.title", value); error=false;}}
					/>
					{error && 
						<Message negative>
							<Message.Header>Title cannot be empty.</Message.Header>
						</Message>
					}
				</Form.Field>
				<Form.Field>
					<label>Description</label>
					<TextArea
						name = "attributes.description"
						placeholder = "Description"
						defaultValue = { formikValues.attributes.description }
						onChange = {(e, { value }) => props.setFieldValue(
							"attributes.description", value)}
					/>
				</Form.Field>
				<Datepicker 
					customInput = { <CustomInput/> } 
					name = "attributes.duedate" 
					isClearable 
				/>
				<Form.Field>
					<label>Category</label>
					<Dropdown
						selection
						name = "attributes.categoryid"
						options = { options }
						defaultValue = { formikValues.attributes.categoryid == null 
							? -1 
							: formikValues.attributes.categoryid.toString() }
						onChange = {(e, { value }) => props.setFieldValue(
							"attributes.categoryid", value)}
					/>
				</Form.Field>
				<Button type = "submit">{ formikValues.id ? "Update" : "Create" }</Button>
			</Form>
		)}
		</Formik>
	);
}

export default _TodoForm