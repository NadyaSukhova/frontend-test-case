import React, { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { store } from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <div className="main-content">
          <ProductList />
          <Cart />
        </div>
      </div>
    </Provider>
  );
}

export default App;
