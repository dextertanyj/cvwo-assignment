import DeleteTodo from "./DeleteTodo";

function DeleteCategory (category) {

	// Delete all associated todos, category model with catch any that slip through
	const deleteTodos = async () => {
		const response = await fetch("/api/todos?filter[categoryid]="+category.id);
		const { data } = await response.json();
		const todos = data;
		todos.map(todo => DeleteTodo(todo.id));
	};
	deleteTodos();

	const deleteCategory = async () => {
		const response = await fetch("/api/categories/" + category.id, {
			method: "DELETE"
		});
		if (response.ok) {
			return true;
		}
	};
	return deleteCategory();
}

export default DeleteCategory;