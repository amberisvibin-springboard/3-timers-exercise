import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);
  //let todos = [];

  function addTodo(task) {
    //console.table(width, height, color);
    setTodos((todos) => [
      ...todos,
      <Todo task={task} key={todos.length}></Todo>,
    ]);
  }

  //   addTodo(100, 100, "green");

  return (
    <div className="TodoList">
      <h2>TodoList</h2>
      <NewTodoForm addTodo={addTodo}></NewTodoForm>
      {todos}
    </div>
  );
}

export default TodoList;
