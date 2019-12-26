import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const requestTodos = async () => {
      const response = await fetch("/api/todos");
      const { data } = await response.json();
      setTodos(data);
    };
    requestTodos();
  }, []);

  return todos.map(todo => <div>{todo.attributes.title}</div>);
}

export default TodoList;