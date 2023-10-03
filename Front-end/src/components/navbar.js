import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { logout } from "../api/handleapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogOut = () => {
    logout(getLoggedIn);
    navigate('/')
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-5 py-2" id="nav-bar">
        <h2>Todo <FontAwesomeIcon icon="fa-solid fa-house" /></h2>
        <ul className="d-flex w-50 justify-content-end list-unstyled align-items-center m-0 links">
          {loggedIn === true && (
            <>
              <li className="me-3">
                <button>
                  <NavLink to="/">TODOS</NavLink>
                </button>
              </li>
              <li className="me-3">
                <button>
                  <NavLink to="/completed">COMPLETED</NavLink>
                </button>
              </li>
              <li className="me-3">
                <button>
                  <NavLink to="/expired">EXPIRED</NavLink>
                </button>
              </li>
              <li className="me-3">
                <button onClick={handleLogOut} className="log-out-btn">LOGOUT</button>
              </li>
            </>
          )}
          {loggedIn === false && (
            <>
              <li className="me-3">
                <button className="login-btn">
                  <NavLink to="/login">LOGIN</NavLink>
                </button>
              </li>
              <li className="me-3">
                <button className="signup-btn">
                  <NavLink to="/signup">SIGNUP</NavLink>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
