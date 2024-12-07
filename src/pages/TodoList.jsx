import React, { useEffect, useState } from "react";
import api from "../services/api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);


const fetchTodos = async () => {
  try {
    const response = await api.get("/todos");
    setTodos(response.data.data);
    console.log(response.data.data);
  } catch (err) {
    console.error(err);
  }
};

const addTodo = async () => {
  try {
    await api.post("/todos", { title });
    fetchTodos();
    setTitle("");
  } catch (err) {
    console.error(err);
  }
};

const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  } catch (err) {
    console.error(err);
  }
};

return (
  <div>
    <h2> Todo List</h2>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
    />
    <button onClick={addTodo}>Add Todo</button>
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo._id}>
            {todo.title}
            <button
              onClick={() => {
                deleteTodo(todo._id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

};

export default TodoList;
