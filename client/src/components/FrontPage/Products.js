import React from "react";
import Product from "./Product";

const Products = props => {
  return (
    <div>
      {props.products.map(item => {
        return (
          <li>
            <Product
              cart={props.cart}
              setCart={props.setCart}
              key={item.id}
              price={item.price}
              title={item.title}
              img={item.img}
              id={item.id}
            />
          </li>
        );
      })}
    </div>
  );
};

export default Products;
