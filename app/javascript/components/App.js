import React from "react";
import { Router, Link } from "@reach/router";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

function App() {
	return (
		<div>
			<div>
				<nav>
					<Link to="/">Home</Link> 
					<Link to="/add">Add</Link>
				</nav>
			</div>
			<Router>
				<TodoList path="/" />
				<AddTodo path="/add" />
			</Router>
		</div>
	);
}

export default App;