import React from "react";

const Product = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <img src={props.img} alt={props.title} />
      <h2>Price: € {props.price}</h2>
    </div>
  );
};

export default Product;
