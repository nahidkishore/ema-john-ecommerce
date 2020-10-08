import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const Shop = () => {
  //const first10=fakeData.slice(0,10);
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  // update title based on components
  document.title = "Shop more";

  useEffect(() => {
    fetch("https://serene-sea-68053.herokuapp.com/products?search=" + search)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [search]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://serene-sea-68053.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);

    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        <input type="text" onBlur={handleSearch} placeholder="Search Product" />
        {products.length === 0 && <CircularProgress color="secondary" />}
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
        <Link to="/review">
          <button className="main-button">Review Order</button>
        </Link>
      </div>
    </div>
  );
};

export default Shop;
