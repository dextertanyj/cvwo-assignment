import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import DeleteTodo from "./DeleteTodo";
import MarkTodo from "./MarkTodo";
import { Item, Header, Grid, Segment, Dropdown, Button } from 'semantic-ui-react';

function TodoList (props) {

	const [userid, setUserid] = useState(null);
	const [todos, setTodos] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selected, setSelected] = useState(null);
	const [mode, setMode] = useState(false);
	const [sort, setSort] = useState("default");

	const sortOptions = [
		{ text: "Default", value: "default" },
		{ text: "Title", value: "title" },
		{ text: "Due Date", value: "date" }
	]

	function changeSort(by) {
		setSort(by);
	}

	function changeSelected(category_name) {
		setSelected(category_name);
	}

	function toggleMode() {
		setMode(!mode);
	}

	function deleteTodo(todo_id) {
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

	function setTodosSorted(data) {
		switch (sort) {
			case "default":
				setTodos(data.sort((a,b) => (a.id > b.id) ? 1 : -1));
				break;
			case "title":
				setTodos(data.sort((a,b) => (a.attributes.title > b.attributes.title) ? 1 : -1));
				break;
			case "date":
				setTodos(data.sort((a,b) => (a.attributes.duedate == null) ||
					(a.attributes.duedate > b.attributes.duedate) ? 1 : -1));
				break;
			default:
				setTodos(data.sort((a,b) => (a.id > b.id) ? 1 : -1));
				break;
		}
	}

	useEffect(() => {
		setUserid(props.userid);
		const requestCategories = async () => {
			const response = await fetch("/api/categories?filter[userid]=" + userid);
			const { data } = await response.json();
			setCategories(data);
		};
		requestCategories();
		const requestTodos = async () => {
			let response;
			if (selected != null) {
				response = await fetch("/api/todos?filter[userid]=" + userid + "&filter[completed]=" + mode + 
				"&filter[categoryid]=" + selected);
			} else {
				response = await fetch("/api/todos?filter[userid]=" + userid + "&filter[completed]=" + mode);
			}
			const { data } = await response.json();
			setTodosSorted(data);
		};
		requestTodos();
	}, [selected, mode, sort, props, userid]);

	return <div>
		<Segment>
			<Header as="h4">Categories:&nbsp;&nbsp;
				<Button 
					active = {selected == null}
					onClick={()=>changeSelected(null)}>All</Button>
				{categories.map(category => 
					<Button 
						active = {selected == category.id}
						onClick={()=>changeSelected(category.id)}>
						{category.attributes.name}
					</Button>)}
			</Header>
		</Segment>
		<Grid padded>
			<Grid.Column>
				<Button onClick={()=>toggleMode()}>{mode?"Incomplete":"Completed"}</Button>
				<Dropdown
					text='Sort By'
					onChange = {(e, { value }) => changeSort(value)}
					options={ sortOptions }
					button
				/>
			</Grid.Column>
		</Grid>
		<Grid padded>
			<Grid.Column>
				<Item.Group divided>
					{todos.map(todo => 
					<Item><Item.Content>
						<Item.Header>{todo.attributes.title}</Item.Header>
						<Item.Meta>
							{todo.attributes.duedate} 
							{todo.attributes.duedate && todo.attributes.categoryid ? " | " : ""} 
							{/* Catch error when categories has not been fetched */}
							{(todo.attributes.categoryid == null || categories.length == 0)
								? ""
								: categories.find(cat => cat.id == todo.attributes.categoryid).attributes.name}
						</Item.Meta>
						<Item.Description>
							{todo.attributes.description}
						</Item.Description>
						<Item.Extra>
							<Button floated='right' negative onClick={()=>deleteTodo(todo.id)}>Delete</Button>
							<Button floated='right' secondary as={ Link } to="/edittodo" state={{todo: todo}}>Edit</Button>
							{todo.attributes.completed == "false" 
								? <Button floated='right' primary onClick={()=>markTodo(todo.id, false)}>Mark As Completed</Button> 
								: <Button floated='right' primary onClick={()=>markTodo(todo.id,true)}>Mark As Incomplete</Button>
							}
						</Item.Extra>
					</Item.Content></Item>
					)}
				</Item.Group>
			</Grid.Column>
		</Grid>
	</div>
}

export default TodoList;