import React from "react";
import { Router, Link } from "@reach/router";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import AddCategory from "./AddCategory";
import ManageCategory from "./ManageCategory"
import EditCategory from "./EditCategory";
import { Menu, Icon, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


function App() {
	return (
		<div>
			<div>
				<Container textAlign='center'>
				<h1><Icon name="book" />TODO LIST</h1>
				</Container>
				<Menu fluid widths={4}>
					<Menu.Item as={ Link } to='/'>
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
				</Menu>
			</div>
			<Router>
				<TodoList path="/" />
				<AddTodo path="/add" />
				<EditTodo path="/edittodo" />
				<AddCategory path="/addcategory" />
				<ManageCategory path="/managecategory" />
				<EditCategory path="/editcategory" />
			</Router>
		</div>
	);
}

export default App