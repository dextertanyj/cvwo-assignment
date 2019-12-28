import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import DeleteTodo from "./DeleteTodo";
import MarkTodo from "./MarkTodo";

function TodoList(props) {
	const [todos, setTodos] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selected, setSelected] = useState(null);
	const [mode, setMode] = useState(false);

	function ChangeSelected(category_name) {
		setSelected(category_name);
	}

	function toggleMode() {
		setMode(!mode);
	}

	function DelTodo(todo_id) {
		// Refresh state after deleting Todo
		if (DeleteTodo(todo_id)) {
			setTodos(todos.filter(todo => todo.id != todo_id));
		}
	}

	function markTodo(todo_id, status) {
		if (MarkTodo(todo_id, status)) {
			setTodos(todos.filter(todo => todo.id != todo_id));
		}
	}

	useEffect(() => {
		const csrfToken = document.querySelector("meta[name=csrf-token]").content;
		const requestTodos = async () => {
			let response;
			if (selected != null) {
				response = await fetch("/api/todos?filter[completed]=" + mode + "&filter[categoryid]="+selected, {headers: {"X-CSRF-Token": csrfToken}});
			} else {
				response = await fetch("/api/todos?filter[completed]=" + mode, {headers: {"X-CSRF-Token": csrfToken}});
			}
			const { data } = await response.json();
			setTodos(data);
		};
		requestTodos();
		const requestCategories = async () => {
			const response = await fetch("/api/categories", {headers: {"X-CSRF-Token": csrfToken}});
			const { data } = await response.json();
			setCategories(data);
		};
		requestCategories();
	}, [selected, mode]);

	return <div>
		<nav>
			Show:
			<button onClick={()=>toggleMode()}>{mode?"Incomplete Todos":"Completed Todos"}</button>
		</nav>
		<nav>
			Categories:
			<button onClick={()=>ChangeSelected(null)}>All</button>
			{categories.map(category => <button onClick={()=>ChangeSelected(category.id)}>{category.attributes.name}</button>)}
		</nav>
		<div>
		{todos.map(todo => 
			<div>
				{todo.attributes.title} 
				{todo.attributes.completed == "false" 
					? <button onClick={()=>markTodo(todo.id, false)}>Mark As Completed</button> 
					: <button onClick={()=>markTodo(todo.id,true)}>Mark As Incomplete</button>
				}
				<Link to="/edittodo" state={{todo: todo}}><button>Edit</button></Link>
				<button onClick={()=>DelTodo(todo.id)}>Delete</button>
			</div>
			)}
		</div>
	</div>
}

export default TodoList;