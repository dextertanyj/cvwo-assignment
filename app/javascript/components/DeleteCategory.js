import DeleteTodo from "./DeleteTodo";

function DeleteCategory (userid, category) {

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