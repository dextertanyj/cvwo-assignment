import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import DeleteCategory from "./DeleteCategory";

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
		<div>
		{categories.map(category => 
			<div>
				{category.attributes.name} 
				<Link to="/editcategory" state={{category: category}}><button>Edit</button></Link>
				<button onClick={()=>deleteCategory(category)}>Delete</button>
			</div>
			)}
		</div>
	</div>
}

export default TodoList;