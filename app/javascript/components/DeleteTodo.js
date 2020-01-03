function DeleteTodo (todo_id) {
	const requestTodos = async () => {
		const response = await fetch("/api/todos/" + todo_id, {
			method: "DELETE"
		});
		if (response.ok) {
			return true;
		}
	};
	return requestTodos();
}

export default DeleteTodo;