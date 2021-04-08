import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const getName = e => {
    setDetails({ ...details, name: e.target.value });
  };

  const getEmail = e => {
    setDetails({ ...details, email: e.target.value });
  };

  const getPassword = e => {
    setDetails({ ...details, password: e.target.value });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    if (response.status === 200) alert("User created");
    else alert("User not created");
  };

  return (
    <div>
      <form>
        <div className="form-inner">
          <h2>Register new user</h2>
          <div className="form-group">
            <label htmlFor="name">Name: </label>

            <input type="text" onChange={getName} />

            <label htmlFor="email">Email: </label>
            <input type="email" onChange={getEmail} />

            <label htmlFor="password">Password: </label>
            <input type="password" onChange={getPassword} />
          </div>
        </div>
      </form>
      <Link to="/">
        <button onClick={submitHandler}>Submit new user</button>
      </Link>
      <Link to="/">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default RegisterUser;
