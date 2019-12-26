import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import DeleteTodo from "./DeleteTodo";
import CompleteTodo from "./CompleteTodo";

function TodoList() {
	const [todos, setTodos] = useState([]);

	function DelTodo(todo_id) {
		// Refresh state after deleting Todo
		if (DeleteTodo(todo_id)) {
			setTodos(todos.filter(todo => todo.id != todo_id));
		}
	}

	function CompTodo(todo_id) {
		if (CompleteTodo(todo_id)) {
			setTodos(todos.filter(todo => todo.id != todo_id));
		}
	}

	useEffect(() => {
		const csrfToken = document.querySelector("meta[name=csrf-token]").content;
		const requestTodos = async () => {
			const response = await fetch("/api/todos?filter[completed]=false", {headers: {"X-CSRF-Token": csrfToken}});
			const { data } = await response.json();
			setTodos(data);
		};
		requestTodos();
	}, []);

	return todos.map(todo => 
		<div>
			{todo.attributes.title} 
			<button onClick={()=>CompTodo(todo.id)}>Mark As Completed</button>
			<Link to="/edit" state={{todo: todo}}><button>Edit</button></Link>
			<button onClick={()=>DelTodo(todo.id)}>Delete</button>
		</div>
	);
}

export default TodoList;