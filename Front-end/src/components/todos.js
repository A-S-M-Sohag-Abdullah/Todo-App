import React, { useEffect, useState } from "react";
import {
  deleteTodo,
  getAllTodos,
  saveTodo,
  updateTodo,
} from "../api/handleapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleCheck,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Todos() {
  const [newTodo, setnewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [operatingId, setOperatingId] = useState(null);

  const handleChange = (e) => {
    setnewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {};
    todo.task = newTodo;

    if (!isUpdating) saveTodo(todo, setTodos);
    else {
      updateTodo(operatingId, { task: newTodo }, setTodos);
      setIsUpdating(false);
      setOperatingId(null);
    }
    setnewTodo("");
  };

  const handleUpdate = (todoid, task) => {
    setnewTodo(task);
    setIsUpdating(true);
    setOperatingId(todoid);
  };

  const handleDone = (todoid) => {
    updateTodo(todoid, { done: true }, setTodos);
  };

  useEffect(() => {
    getAllTodos(setTodos);
  }, []);

  return (
    <div className="mx-auto w-50 py-5">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="mb-3"
        id="todo-form"
      >
        <input
          type="text"
          value={newTodo}
          onChange={handleChange}
          placeholder="Enter your todo"
        />
        <input type="submit" value="ADD TODO" />
      </form>
      <ul className="list-unstyled">
        {todos
          .filter((todo) => !todo.expired && !todo.done)
          .map((todo, index) => (
            <li
              key={todo._id}
              className="mb-3 d-flex justify-content-between single-todo"
            >
              {todo.task}
              <div className="d-flex align-items-center">
                <button
                  className="ms-3 mark-done"
                  onClick={() => handleDone(todo._id)}
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </button>

                <button
                  className="ms-3 update-btn"
                  onClick={() => {
                    handleUpdate(todo._id, todo.task);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button
                  className="ms-3 delete-btn"
                  onClick={() => deleteTodo(todo._id, setTodos)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Todos;
