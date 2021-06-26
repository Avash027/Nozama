import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../actions/productActions";
import Rating from "../Components/Rating";
import Loading from "../Components/Loading";
import Error from "../Components/Error"
import CommentSection from "../Components/CommentSection";

//match gets the id from the link
const ProductPage = ({ history, match }) => {
  
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState({});

  const dispatch = useDispatch();
  //use the name mentioned in the store.js
  const productDetails = useSelector((state) => state.productDetails);

  //TODO: Add loading and todo
  const {loading,error, product } = productDetails;

  useEffect(() => {
    dispatch(ProductDetails(match.params.id));
  }, [dispatch, match,comment]);

  

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`); //To redirect
  };

  let options = [];

  let elem;

  if ((!product && !error) || loading) elem = <Loading></Loading>
  else if(error) elem = <Error></Error>
  else {
    
    for (let i = 1; i <= product.countInStock; i++) options.push(i);

    elem =  (
      <div className="product-main">
        <div className="product-main-container-img">
          <img
            src={product.image}
            alt={product.name}
            className="product-main-img"
          />
        </div>

        <div className="product-main-info">
          <div className="product-main-title">{product.name}</div>
          <hr></hr>
          <div className="product-main-desc">{product.description}</div>

          <div className="product-main-rating">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            ></Rating>
          </div>

          <div className="product-main-checkout">
            <div className="product-main-checkout-heading">Checkout Box</div>
            <div className="product-main-checkout-price">
              Price : Rs {product.price}
            </div>
            <div className="product-main-checkout-quantity">
              <select
                className="product-main-checkout-select"
                onChange={(e) => setQty(parseInt(e.target.value))}
              >
                {options.map((value, idx) => {
                  return (
                    <option value={value} key={idx.toString()}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>

            {product.countInStock === 0 ? (
              <div style={{ color: "red", paddingTop: "1rem" }}>
                Out of Stock
              </div>
            ) : (
              <div className="product-main-checkout-button">
                <button
                  className={`button button-primary`}
                  href="#"
                  onClick={addToCart}
                >
                  Add to cart
                </button>
              </div>
            )}
          </div>
        </div>

        <CommentSection 
        productID={match.params.id} 
        reviews = {product.reviews}
        setComment = {setComment} 
        />
      </div>
    );
  }



  return <>{elem}</>
};

export default ProductPage;
