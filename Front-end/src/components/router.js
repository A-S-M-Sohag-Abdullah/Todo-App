import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Todos from "./todos";
import CompletedTodos from "./completedTodos";
import ExpiredTodos from "./expiredTodos";
import Login from "./login";
import Signup from "./signup";
import AuthContext from "../context/authContext";

function Routing() {

  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>

      <Routes>
        {loggedIn === true && (
          <>
            <Route index element={<Todos />} />
            <Route path="/completed" element={<CompletedTodos />} />
            <Route path="/expired" element={<ExpiredTodos />} />
          </>
        )}
        {loggedIn === false && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
