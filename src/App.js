import React from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id
          ? (todo = { id: todo.id, todo })
          : { id: todo.id, todo: todo.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  // const handleEdit = (id) => {
  //   return () => {
  //     const updatedTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, text: prompt("Edit Todo", todo.text) };
  //       }
  //       return todo;
  //     });
  //     setTodos(updatedTodos);
  //   };
  // };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoform" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "GO"}</button>
        </form>
        <ul className="alltodos">
          {todos.map((todo) => (
            <li className="singleTodo">
              <span className="todotext" key={todo.id}>
                {todo.todo}
              </span>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
