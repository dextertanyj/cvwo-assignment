import React from "react";
import { Router } from "@reach/router";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

function App() {
  return (
    <Router>
      <TodoList path="/" />
      <AddTodo path="/add" />
    </Router>
  );
}

export default App;