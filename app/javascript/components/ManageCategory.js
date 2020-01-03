import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import DeleteCategory from "./DeleteCategory";
import { Item, Grid, Button } from 'semantic-ui-react';

function TodoList(props) {
	const [categories, setCategories] = useState([]);

	function deleteCategory(category) {
		// Refresh state after deleting Category
		if (DeleteCategory(category)) {
			setCategories(categories.filter(cat => cat.id != category.id));
		}
	}

	useEffect(() => {
		const csrfToken = document.querySelector("meta[name=csrf-token]").content;
		const requestCategories = async () => {
			const response = await fetch("/api/categories", {headers: {"X-CSRF-Token": csrfToken}});
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
				 					<Button floated='right' negative onClick={()=>deleteCategory(category)}>Delete</Button>
				 					<Button floated='right' secondary as={ Link } to="/editcategory" state={{category: category}}>Edit</Button>
				 				</Item.Extra>
				 			</Item.Content>
				 		</Item>
					)}
				</Item.Group>
			</Grid.Column>
		</Grid>
	</div>
}

export default TodoList;