import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import Products from "./components/FrontPage/Products";
import Grocery from "./components/FrontPage/Grocery";
import Cart from "./components/FrontPage/Cart";

function App() {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localStorage.getItem("cart")) : [];
  });
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const getProducts = async () => {
    if (token) {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          auth_token: token,
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
    }
  };

  useEffect(() => {
    getProducts();
  }, [token]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <Router>
        {!token ? (
          <Switch>
            <Route path="/" exact>
              <Login setToken={setToken} />
            </Route>
            <Route path="/register" component={RegisterUser}></Route>
          </Switch>
        ) : (
          <div>
            <Switch>
              <Route path="/" exact>
                <Grocery setToken={setToken} />
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
