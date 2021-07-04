import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CartItem from "../Components/cartPageElements/CartItem";
import Loading from "../Components/Others/Loading";
import Rupees from "../utils/Rupees";

const CartPage = ({ match, location, history }) => {
  const productIDfromTheURL = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  const { cartItems } = cart;

  useEffect(() => {
    if (productIDfromTheURL) {
      dispatch(addToCart(productIDfromTheURL, qty));
    }
  }, [dispatch, productIDfromTheURL, qty]);

  const changeItemQuantity = (e, item) => {
    dispatch(addToCart(item.product, Number(e.target.value)));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userLogin) history.push("/shipping");
    else history.push("/login");
  };

  let cartItemsToBeRendered;
  let totalProducts = 0;
  let bill = 0;

  for (let i = 0; i < cartItems.length; i++) {
    totalProducts += cartItems[i].qty;
    bill += cartItems[i].qty * cartItems[i].price;
  }

  bill = bill.toFixed(4);

  if (!cartItems) cartItemsToBeRendered = <Loading></Loading>;
  else if (cartItems.length === 0)
    cartItemsToBeRendered = (
      <h2 style={{ textAlign: "center", padding: "2rem" }}>Cart Empty !!!</h2>
    );
  else {
    cartItemsToBeRendered = (
      <div>
        {cartItems.map((item) => (
          <div key={item.product}>
            <CartItem
              item={item}
              changeItemQuantity={changeItemQuantity}
              removeFromCartHandler={removeFromCartHandler}
            ></CartItem>
          </div>
        ))}

        <hr style={{ marginTop: "1rem", marginBottom: "1rem" }}></hr>

        <div className="cart-details">
          <div className="cart-details-left">
            <div>Total Items : </div>
            <div>Total Price : </div>
          </div>
          <div className="cart-details-right">
            <div>{totalProducts}</div>
            <div>{Rupees(bill)}</div>
          </div>
        </div>

        <button
          className="button button-primary"
          onClick={() => checkoutHandler()}
          style={{ display: "block", margin: "2rem auto" }}
        >
          Buy Now
        </button>
      </div>
    );
  }

  return <div className="cart">{cartItemsToBeRendered}</div>;
};

export default CartPage;
