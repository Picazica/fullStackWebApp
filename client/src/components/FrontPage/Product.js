import React from "react";

const Product = props => {
  const addToCart = e => {
    const identification = e.target.dataset.id;
    props.cart.some(item => {
      return item.id === identification;
    })
      ? props.setCart(
          props.cart.map(item => {
            if (item.id === identification) item.amount += 1;
            return item;
          })
        )
      : props.setCart([
          ...props.cart,
          {
            id: props.id,
            img: props.img,
            title: props.title,
            price: props.price,
            amount: 1,
          },
        ]);
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <img src={props.img} alt={props.title} />
      <h2>Price: € {props.price}</h2>
      <button onClick={addToCart} data-id={props.id}>
        Add it
      </button>
    </div>
  );
};

export default Product;
