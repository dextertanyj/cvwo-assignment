function MarkTodo(todo_id, status) {
	const requestTodos = async () => {
		// Toggle new status based on current status of completion.
		const new_status = status ? "false" : "true";

		const values = {
			type: "todos",
			id: todo_id,
			attributes: {
				completed: new_status
			}
		};

		const response = await fetch("/api/todos/" + todo_id, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/vnd.api+json"
			},
			body: JSON.stringify({ data: values })
		});
		if (response.ok) {
			return true;
		}
	};
	return requestTodos();
}

export default MarkTodo;
