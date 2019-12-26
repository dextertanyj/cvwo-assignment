import React from "react";
import { Router, Link } from "@reach/router";
import TodoList from "./TodoList";
import CompletedTodoList from "./CompletedTodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

function App() {
	return (
		<div>
			<div>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/completed">Completed</Link>
					<Link to="/add">Add</Link>
				</nav>
			</div>
			<Router>
				<TodoList path="/" />
				<AddTodo path="/add" />
				<EditTodo path="/edit" />
				<CompletedTodoList path="/completed" />
			</Router>
		</div>
	);
}

export default App;