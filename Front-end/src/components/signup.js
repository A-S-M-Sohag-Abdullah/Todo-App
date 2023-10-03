import React, { useContext, useState } from "react";
import { signup } from "../api/handleapi";
import AuthContext from "../context/authContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {getLoggedIn} = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    const authorized = await signup({username, email, password });
    if(authorized)
      getLoggedIn();
  };

  return (
    <div>
      <form action="" onSubmit={handleSignup} id="signup-form">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
}

export default Signup;
