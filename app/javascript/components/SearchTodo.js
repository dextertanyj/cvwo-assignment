import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import DeleteTodo from "./DeleteTodo";
import MarkTodo from "./MarkTodo";
import { Item, Grid, Button, Input } from 'semantic-ui-react';

function SearchTodo (props) {
	const [userid, setUserid] = useState(null);
    const [todos, setTodos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    // To update Mark As... Button
    const [updating, setUpdating] = useState(false);
    
	function deleteTodo(todo_id) {
		// Refresh state after deleting Todo
		if (DeleteTodo(todo_id)) {
			setTodos(todos.filter(todo => todo.id != todo_id));
		}
	}

	function markTodo(todo_id, status) {
		if (MarkTodo(todo_id, status)) {
			setUpdating(true);
		}
	}

	useEffect(() => {
		setUserid(props.userid);
		if (userid != null) {
			const requestCategories = async () => {
				const response = await fetch("/api/categories?filter[userid]=" + userid);
				const { data } = await response.json();
				setCategories(data);
			};
			requestCategories();
			const requestTodos = async () => {
				let response = await fetch("/api/todos?filter[userid]=" + userid);
				const { data } = await response.json();
				setTodos(data.filter(todo => (
					todo.attributes.description.toLowerCase().includes(search.toLowerCase()) || 
					todo.attributes.title.toLowerCase().includes(search.toLowerCase()))));
			};
			requestTodos();
		}
        setUpdating(false);
	}, [updating, search, props, userid]);

	return <div>
		<Grid padded>
			<Grid.Column>
				<Input 
                fluid
                placeholder="Search..."
                onChange={(e, { value }) => setSearch(value)}
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

export default SearchTodo;