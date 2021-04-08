import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/FrontPage/Products";

function App() {
  let flag = 0;
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(false);
  console.log(status);

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
    console.log(products);
  };

  useEffect(() => {
    if (status && !loggedIn && !flag) {
      getProducts();
      flag = 1;
    }
  }, [status]);

  return (
    <div className="App">
      {!status ? (
        <Router>
          <Switch>
            <Route path="/" exact>
              <Login setStatus={setStatus} />
            </Route>
            <Route path="/register" component={RegisterUser}></Route>
          </Switch>
        </Router>
      ) : (
        <Products
          setLoggedIn={setLoggedIn}
          setStatus={setStatus}
          products={products}
        />
      )}
    </div>
  );
}

export default App;
