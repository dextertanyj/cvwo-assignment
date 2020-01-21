import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import AddCategory from "./AddCategory";
import ManageCategory from "./ManageCategory"
import EditCategory from "./EditCategory";
import SearchTodo from "./SearchTodo";
import SignIn from "./SignIn";
import Registration from "./Registration";
import LogOut from "./_LogOut";
import { Menu, Icon, Container } from 'semantic-ui-react';

function App() {

	const [user, setUser] = useState({});
	const [LoggedIn, setLoggedIn] = useState("LOGGEDOUT");
	const [token, setToken] = useState("");
	
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

	useEffect(() => {
		const requestCurrentUser = async () => {
			const response = await fetch("/logged_in");
			const { logged_in, user, auth_token } = await response.json();
			if (logged_in) {
				setLoggedIn("LOGGEDIN");
				setUser(user);
				navigate("/home");
				setToken(auth_token)
			} else {
				navigate("/")
			}
		};
		requestCurrentUser();
	}, []);

	return (
		<div>
			<div>
				<Container textAlign='center'>
				<h1><Icon name="book" />TODO LIST</h1>
				</Container>
				{ LoggedIn == "LOGGEDIN" &&
				<Menu stackable fluid widths={6}>
					<Menu.Item as={ Link } to='/home'>
  						<Icon name='home' />
 						 Home
					</Menu.Item>
					<Menu.Item as={ Link } to='/add'>
  						<Icon name='add' />
 						 Todo
					</Menu.Item>
					<Menu.Item as={ Link } to='/addcategory'>
  						<Icon name='add' />
 						 Category
					</Menu.Item>
					<Menu.Item as={ Link } to='/managecategory'>
  						<Icon name='setting' />
 						 Manage Categories
					</Menu.Item>
					<Menu.Item as={ Link } to='/searchtodo'>
  						<Icon name='search' />
 						 Search
					</Menu.Item>
					<Menu.Item onClick={() => handleLogOut()}>
  						<Icon name='log out'/>
 						 Log Out
					</Menu.Item>
				</Menu>
				}
			</div>
			<Router>
				<SignIn path="/" helperLogIn={handleLogIn} />
				<Registration path="/registration" helperLogIn={handleLogIn} />
				<TodoList path="/home" userid={user.id} authtoken={token}/>
				<AddTodo path="/add" userid={user.id} authtoken={token}/>
				<EditTodo path="/edittodo" userid={user.id} authtoken={token}/>
				<AddCategory path="/addcategory" userid={user.id} authtoken={token}/>
				<ManageCategory path="/managecategory" userid={user.id} authtoken={token}/>
				<EditCategory path="/editcategory" userid={user.id} authtoken={token}/>
				<SearchTodo path="/searchtodo" userid={user.id} authtoken={token}/>
			</Router>
		</div>
	);
}

export default App