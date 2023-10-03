import React, { useContext, useState } from 'react'
import { login } from '../api/handleapi';
import AuthContext from '../context/authContext';

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const {getLoggedIn} = useContext(AuthContext);

  const handleLogin = async (e)=>{
    e.preventDefault();
    const authorized = await login({email,password,getLoggedIn});
    if(authorized)
      getLoggedIn();

  }
  return (
    <div>
      <form action="" onSubmit={handleLogin} id='login-form'>
        <input type="email"  placeholder='Email' onChange={(e)=> setEmail(e.target.value)} required/>
        <input type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} required/>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login