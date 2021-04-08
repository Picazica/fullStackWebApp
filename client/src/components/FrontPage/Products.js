import React from "react";
import Product from "./Product";

const Products = props => {
  const changeStatus = () => {
    props.setStatus(prev => !prev);
    props.setLoggedIn(prev => !prev);
  };

  return (
    <div>
      <nav className="navBar">
        <h1>Grocery List</h1>
        <button className="logout-btn" onClick={changeStatus}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </nav>
      {props.products.map(item => {
        return (
          <li>
            <Product
              key={item.id}
              price={item.price}
              title={item.title}
              img={item.img}
            />
          </li>
        );
      })}
    </div>
  );
};

export default Products;
