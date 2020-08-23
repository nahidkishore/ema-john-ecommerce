import React from 'react';
import './Product.css';

const Product = (props) => {
  //console.log(props.product);
  return (
    <div>
      {/* <h3>This is Product</h3> */}
      <h4>{props.product.name}</h4>
      
    </div>
  );
};

export default Product;