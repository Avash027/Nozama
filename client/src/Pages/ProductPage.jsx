import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../actions/productActions";
import Rupees from "../utils/Rupees";
import loadable from "@loadable/component";

const Rating = loadable(() => import("../Components/Others/Rating"));
const Loading = loadable(() => import("../Components/Others/Loading"));
const Error = loadable(() => import("../Components/Others/Error"));
const CommentSection = loadable(() =>
  import("../Components/ProductPageElements/CommentSection")
);

const ProductPage = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState({});

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product) return;
    document.title = product.name;
  }, [product]);

  useEffect(() => {
    dispatch(ProductDetails(match.params.id));
  }, [dispatch, match, comment]);

  const addToCart = () => {
    if (!userInfo) history.push(`/login`);
    else history.push(`/cart/${match.params.id}?qty=${qty}`); //To redirect
  };

  let options = [];

  let elem;

  if ((!product && !error) || loading) elem = <Loading></Loading>;
  else if (error) elem = <Error></Error>;
  else {
    for (let i = 1; i <= product.countInStock; i++) options.push(i);

    elem = (
      <section className="product-main">
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
          <article className="product-main-desc">{product.description}</article>

          <div className="product-main-rating">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            ></Rating>
          </div>

          <div className="product-main-checkout">
            <div className="product-main-checkout-heading">Cart Box</div>
            <div className="product-main-checkout-price">
              Price : {Rupees(product.price)}
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
                  <i className="fas fa-shopping-cart"> </i>
                  Add to cart
                </button>
              </div>
            )}
          </div>
        </div>

        <CommentSection
          productID={match.params.id}
          reviews={product.reviews}
          setComment={setComment}
          history={history}
        />
      </section>
    );
  }

  return <>{elem}</>;
};

export default ProductPage;
