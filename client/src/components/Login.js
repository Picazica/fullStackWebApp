import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = props => {
  const [user, setUser] = useState({});

  const getEmail = e => {
    setUser({ ...user, email: e.target.value });
  };

  const getPassword = e => {
    setUser({ ...user, password: e.target.value });
  };

  const checkUser = async e => {
    e.preventDefault();
    console.log(user);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      console.log("Ok");
      props.setStatus(prev => !prev);
    }
  };

  return (
    <div>
      <form className="loginForm">
        <div className="form-inner">
          <h2 className="aqui">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" onChange={getEmail} />
            <label htmlFor="password">Password: </label>
            <input type="text" onChange={getPassword} />
          </div>
          <button className="login-btn" onClick={checkUser}>
            Login
          </button>
          <Link to="/register">
            <button className="register-btn">Register new user</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
