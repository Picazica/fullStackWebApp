import React from "react";
import { Link } from "react-router-dom";

const Cart = props => {
  let total = 0;
  const removeItem = e => {
    const identification = e.target.dataset.id;
    props.setCart(props.cart.filter(item => item.id !== identification));
  };

  const lessAmount = e => {
    const identification = e.target.dataset.id;
    props.setCart(
      props.cart.map(item => {
        if (item.id === identification && item.amount > 1) item.amount -= 1;
        return item;
      })
    );
  };

  const addAmount = e => {
    const identification = e.target.dataset.id;
    props.setCart(
      props.cart.map(item => {
        if (item.id === identification) item.amount += 1;
        return item;
      })
    );
  };

  const clear = () => {
    props.setCart([]);
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <button className="closeCart-btn">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </Link>
      </nav>
      <h1>Cart</h1>

      <ul>
        {props.cart.map(item => {
          total += item.amount * item.price;
          return (
            <li>
              <h2>{item.title}</h2>
              <img src={item.img} alt={item.title} />
              <h3>Price: €{item.price}</h3>
              <button
                className="remove-item"
                onClick={removeItem}
                data-id={item.id}
              >
                remove
              </button>
              <button
                className="windowDown"
                className="windowUp"
                onClick={addAmount}
                data-id={item.id}
              >
                up
              </button>
              <p className="item-amount">{item.amount}</p>
              <button
                className="windowDown"
                className="windowUp"
                onClick={lessAmount}
                data-id={item.id}
              >
                down
              </button>
            </li>
          );
        })}
      </ul>
      <div className="cart-footer">
        <h3>
          Your total average: €{" "}
          <span className="cart-total">{parseFloat(total.toFixed(2))}</span>
        </h3>
        <button className="clear-cart banner-btn" onClick={clear}>
          Clear grocery list
        </button>
      </div>
    </div>
  );
};

export default Cart;
