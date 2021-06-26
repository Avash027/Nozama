import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  

  return (
    <div className="product-card">
      <div className="product-card-container-img">
        <Link to={`./product/${product._id}`}>
          <img src={product.image} className="product-card-img" alt={product.name}></img>
        </Link>
      </div>

      <div className="product-card-title">
        <Link to={`./product/${product._id}`} className="a-blue">
          {product.name}
        </Link>
      </div>

      <div className="product-card-rating">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>

      <div className="product-card-price">Price : Rs {product.price}</div>
     
    </div>
  );
};

export default Product;
