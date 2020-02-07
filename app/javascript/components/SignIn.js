import React, { useState } from "react";
import { Link } from "@reach/router";
import { Grid, Menu, Icon, Message } from "semantic-ui-react";
import SignInForm from "./_SignInForm";

function SignIn(props) {
	const [error, setError] = useState(false);

	const handleSubmit = values => {
		const requestCreateSession = async () => {
			const response = await fetch("/sessions", {
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
			} else if (response.status === 401) {
				setError(true);
			}
		};
		requestCreateSession();
	};

	// Set default values as empty.
	const formikValues = {
		user: {
			email: "",
			password: ""
		}
	};

	return (
		<div>
			<Menu fluid widths={1}>
				<Menu.Item as={Link} to="/registration">
					<Icon name="add user" />
					Register
				</Menu.Item>
			</Menu>
			<Grid padded>
				<Grid.Column>
					<h2>Sign In</h2>
					{error && (
						<Message negative>
							<Message.Header>Email or password incorrect. Please try again.</Message.Header>
						</Message>
					)}
					{SignInForm(formikValues, handleSubmit)}
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default SignIn;
