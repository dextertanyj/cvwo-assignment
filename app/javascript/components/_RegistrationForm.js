import React from "react";
import { Formik } from "formik";
import { Form, Button, Input } from "semantic-ui-react";

function RegistrationForm(formikValues, handleSubmit) {
	return (
		<Formik initialValues={formikValues} onSubmit={handleSubmit}>
			{props => (
				<Form onSubmit={props.handleSubmit}>
					<Form.Field>
						<label>Email</label>
						<Input
							name="user.email"
							placeholder="Email"
							defaultValue={formikValues.user.email}
							type="email"
							required={true}
							onChange={(e, { value }) => props.setFieldValue("user.email", value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<Input
							name="user.password"
							placeholder="Password"
							defaultValue={formikValues.user.password}
							type="password"
							required={true}
							onChange={(e, { value }) => props.setFieldValue("user.password", value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Confirm Password</label>
						<Input
							name="user.password_confirmation"
							placeholder="Confirm Password"
							defaultValue={formikValues.user.password_confirmation}
							type="password"
							required={true}
							onChange={(e, { value }) => props.setFieldValue("user.password_confirmation", value)}
						/>
					</Form.Field>
					<Button type="submit">Register</Button>
				</Form>
			)}
		</Formik>
	);
}

export default RegistrationForm;
