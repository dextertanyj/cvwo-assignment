import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import AddCategory from "./AddCategory";
import ManageCategory from "./ManageCategory";
import EditCategory from "./EditCategory";
import SearchTodo from "./SearchTodo";
import SignIn from "./SignIn";
import Registration from "./Registration";
import LogOut from "./_LogOut";
import { Menu, Icon, Container } from "semantic-ui-react";

function App() {
	const [user, setUser] = useState({});
	const [LoggedIn, setLoggedIn] = useState("LOGGEDOUT");

	function handleLogOut() {
		if (LogOut()) {
			setUser({});
			setLoggedIn("LOGGEDOUT");
			navigate("/");
		}
	}

	function handleLogIn(user) {
		setLoggedIn("LOGGEDIN");
		setUser(user);
		navigate("/home");
	}

	// Check if session cookie is available, otherwise force redirect to login page.
	useEffect(() => {
		const requestCurrentUser = async () => {
			const response = await fetch("/logged_in");
			const { logged_in, user } = await response.json();
			if (logged_in) {
				setLoggedIn("LOGGEDIN");
				setUser(user);
				navigate("/home");
			} else {
				navigate("/");
			}
		};
		requestCurrentUser();
	}, []);

	return (
		<div>
			<div>
				<Container textAlign="center">
					<h1>
						<Icon name="book" />
						TODO LIST
					</h1>
				</Container>
				{LoggedIn == "LOGGEDIN" && (
					<Menu stackable fluid widths={6}>
						<Menu.Item as={Link} to="/home">
							<Icon name="home" />
							Home
						</Menu.Item>
						<Menu.Item as={Link} to="/add">
							<Icon name="add" />
							Todo
						</Menu.Item>
						<Menu.Item as={Link} to="/addcategory">
							<Icon name="add" />
							Category
						</Menu.Item>
						<Menu.Item as={Link} to="/managecategory">
							<Icon name="setting" />
							Manage Categories
						</Menu.Item>
						<Menu.Item as={Link} to="/searchtodo">
							<Icon name="search" />
							Search
						</Menu.Item>
						<Menu.Item onClick={() => handleLogOut()}>
							<Icon name="log out" />
							Log Out
						</Menu.Item>
					</Menu>
				)}
			</div>
			<Router>
				<SignIn path="/" helperLogIn={handleLogIn} />
				<Registration path="/registration" helperLogIn={handleLogIn} />
				<TodoList path="/home" userid={user.id} />
				<AddTodo path="/add" userid={user.id} />
				<EditTodo path="/edittodo" userid={user.id} />
				<AddCategory path="/addcategory" userid={user.id} />
				<ManageCategory path="/managecategory" userid={user.id} />
				<EditCategory path="/editcategory" userid={user.id} />
				<SearchTodo path="/searchtodo" userid={user.id} />
			</Router>
		</div>
	);
}

export default App;
