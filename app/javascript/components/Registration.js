import React, { useState } from "react";
import { Link } from "@reach/router";
import { Grid, Icon, Menu, Message } from "semantic-ui-react";
import RegistrationForm from "./_RegistrationForm";

function Registration(props) {
	const [error, setError] = useState(false);

	const handleSubmit = values => {
		const requestCreateUser = async () => {
			const response = await fetch("/registrations", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ data: values })
			});
			if (response.status == 200) {
				const { user } = await response.json();
				props.helperLogIn(user);
			} else if (response.status === 422) {
				setError(true);
			}
		};
		requestCreateUser();
	};

	const formikValues = {
		user: {
			email: "",
			password: "",
			password_confirmation: ""
		}
	};

	return (
		<div>
			<Menu fluid widths={1}>
				<Menu.Item as={Link} to="/">
					<Icon name="sign in" />
					Sign In
				</Menu.Item>
			</Menu>
			<Grid padded>
				<Grid.Column>
					<h2>Registration</h2>
					{error && (
						<Message negative>
							<Message.Header>Email taken or passwords do not match. Please try again.</Message.Header>
						</Message>
					)}
					{RegistrationForm(formikValues, handleSubmit)}
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default Registration;
