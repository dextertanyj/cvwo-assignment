import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import AddCategory from "./AddCategory";
import ManageCategory from "./ManageCategory"
import EditCategory from "./EditCategory";

function App() {

	return (
		<div>
			<div>
				<nav>
					<Link to="/">Home</Link> &nbsp;
					<Link to="/add">Add</Link> &nbsp;
					<Link to="/addcategory">Add Category</Link> &nbsp;
					<Link to="/managecategory">Manage Categories</Link>
				</nav>
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

export default App;