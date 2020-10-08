import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  // update title based on components
  document.title = "product detail";

  useEffect(() => {
    fetch("https://serene-sea-68053.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productKey]);
  //const product= fakeData.find(pd=>pd.key=== productKey);
  console.log(product);
  return (
    <div>
      <h2>Your Product details</h2>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Product showAddToCart={false} product={product}></Product>
      )}
    </div>
  );
};

export default ProductDetail;
