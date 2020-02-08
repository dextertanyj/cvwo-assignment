import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import DeleteCategory from "./DeleteCategory";
import { Item, Grid, Button, Confirm, Message, Dimmer, Loader } from "semantic-ui-react";

function TodoList(props) {
	const [userid, setUserid] = useState(props.userid);
	const [categories, setCategories] = useState([]);
	const [confirm, setConfirm] = useState(false);
	const [selected, setSelected] = useState();
	const [loading, setLoading] = useState(true);

	function open(category) {
		setSelected(category);
		setConfirm(true);
	}

	function close() {
		deleteCategoryHandler(selected);
		setConfirm(false);
	}

	function cancel() {
		setSelected();
		setConfirm(false);
	}

	function deleteCategoryHandler(category) {
		// Refresh state after deleting Category
		if (DeleteCategory(category)) {
			setCategories(categories.filter(cat => cat.id != category.id));
		}
	}

	useEffect(() => {
		setUserid(props.userid);
		if (userid != null) {
			const requestCategories = async () => {
				const response = await fetch("/api/categories?filter[userid]=" + userid);
				const { data } = await response.json();
				setCategories(data);
				setLoading(false);
			};
			requestCategories();
		}
	}, [userid]);

	return (
		<div>
			{loading && (
				<Dimmer active>
					<Loader content="Loading" />
				</Dimmer>
			)}
			<Grid padded>
				<Grid.Column>
					<Item.Group divided>
						{categories.length == 0 && <Message>You have not created any categories.</Message>}
						{categories.map(category => (
							<Item>
								<Item.Content>
									<Item.Header>{category.attributes.name}</Item.Header>
									<Item.Extra>
										<Button floated="right" negative onClick={() => open(category)}>
											Delete
										</Button>
										<Button
											floated="right"
											secondary
											as={Link}
											to="/editcategory"
											state={{ category: category }}
										>
											Edit
										</Button>
									</Item.Extra>
								</Item.Content>
							</Item>
						))}
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
	);
}

export default TodoList;
