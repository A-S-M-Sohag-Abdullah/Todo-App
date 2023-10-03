import React, { useEffect, useState } from "react";
import { getAllTodos } from "../api/handleapi";

function ExpiredTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos(setTodos);
  }, []);
  return (
    <div>
      <ul id="todo-list" className="ps-5">
        {todos
          .filter((todo) => todo.expired)
          .map((todo, index) => (
            <li key={todo._id} className="text-white text-uppercase mb-3">{todo.task}</li>
          ))}
      </ul>
    </div>
  );
}

export default ExpiredTodos;
