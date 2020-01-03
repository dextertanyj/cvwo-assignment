import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import DeleteCategory from "./DeleteCategory";
import { Item, Grid, Button, Confirm } from 'semantic-ui-react';

function TodoList(props) {
	const [categories, setCategories] = useState([]);
	const [confirm, setConfirm] = useState(false);
	const [selected, setSelected] = useState();

	function open (category) {
		setSelected(category);
		setConfirm(true);
	}

	function close () {
		deleteCategory(selected);
		setConfirm(false);
	}
	
	function cancel () {
		setSelected();
		setConfirm(false);
	}

	function deleteCategory(category) {
		// Refresh state after deleting Category
		if (DeleteCategory(category)) {
			setCategories(categories.filter(cat => cat.id != category.id));
		}
	}

	useEffect(() => {
		const requestCategories = async () => {
			const response = await fetch("/api/categories");
			const { data } = await response.json();
			setCategories(data);
		};
		requestCategories();
	}, []);

	return <div>
		<Grid padded>
			<Grid.Column>
				<Item.Group divided>
					{categories.map(category => 
						<Item>
							<Item.Content>
								<Item.Header>{category.attributes.name}</Item.Header>
								<Item.Extra>
				 					<Button floated='right' negative onClick={()=>open(category)}>Delete</Button>
				 					<Button floated='right' secondary as={ Link } to="/editcategory" state={{category: category}}>Edit</Button>
				 				</Item.Extra>
				 			</Item.Content>
				 		</Item>
					)}
				</Item.Group>
			</Grid.Column>
		</Grid>
		<Confirm
		  open={confirm}
		  content="Are you sure? This will delete all related todos as well. This action is irreversible."
		  confirmButton="Delete"
		  onCancel={cancel}
          onConfirm={close}
        />
	</div>
}

export default TodoList;