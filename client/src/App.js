import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/FrontPage/Products";
import Grocery from "./components/FrontPage/Grocery";
import Cart from "./components/FrontPage/Cart";

function App() {
  let flag = 0;
  const [cart, setCart] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(false);

  const getProducts = async () => {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await response.json();
    let products = data.items;
    products = products.map(item => {
      const price = item.fields.price;
      const id = item.sys.id;
      const title = item.fields.title;
      const img = item.fields.image.fields.file.url;
      return { id, price, title, img };
    });
    setProducts(products);
  };

  useEffect(() => {
    if (status && !loggedIn && !flag) {
      getProducts();
      flag = 1;
    }
  }, [status]);

  return (
    <div className="App">
      <Router>
        {" "}
        {!status ? (
          <Switch>
            <Route path="/" exact>
              <Login setStatus={setStatus} />
            </Route>
            <Route path="/register" component={RegisterUser}></Route>
          </Switch>
        ) : (
          <div>
            <Switch>
              <Route path="/" exact>
                <Grocery setLoggedIn={setLoggedIn} setStatus={setStatus} />
                <Products cart={cart} setCart={setCart} products={products} />
              </Route>
              <Route path="/cart" exact>
                <Cart cart={cart} setCart={setCart} />
              </Route>
            </Switch>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
