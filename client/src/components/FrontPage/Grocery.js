import React from "react";
import { Link } from "react-router-dom";

const Grocery = props => {
  const changeStatus = () => {
    props.setToken(prev => !prev);
  };
  return (
    <div>
      <nav className="navBar">
        <h1>Grocery List</h1>
        <Link to="/cart">
          <button className="checkout-btn">
            <i className="fas fa-shopping-cart"></i>
          </button>
        </Link>

        <button className="logout-btn" onClick={changeStatus}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </nav>
    </div>
  );
};

export default Grocery;
