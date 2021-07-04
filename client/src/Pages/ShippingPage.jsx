import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { removeFromCartAll } from "../actions/cartActions";
import StripeForm from "../Components/StripeForm";
import { _PlaceOrder, _updateProductsQty } from "../utils/ShippingPageAPI";
import { STRIPE_KEY } from "../utils/secretKey";
import Rupees from "../utils/Rupees";

const stripePromise = loadStripe(STRIPE_KEY);

//TODO Check shipping page functionality

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const placeOrderHandler = async (stripeID) => {
    setIsLoading(true);
    const [, error] = await _PlaceOrder(
      address,
      city,
      postalCode,
      country,
      userInfo,
      cartItems,
      price,
      stripeID
    );
    const [, error1] = await _updateProductsQty(cartItems);

    if (error || error1) {
      alert("Please check the details submitted or try again later");
      return;
    }

    setIsLoading(false);

    dispatch(removeFromCartAll());
    alert("Orders placed successfully");
    history.push("/");
  };

  useEffect(() => {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++)
      totalPrice += cartItems[i].price * cartItems[i].qty;
    totalPrice = totalPrice.toFixed(3);
    setPrice(totalPrice);
  }, [cartItems]);

  return (
    <div className="shipping">
      <div className="shipping-container">
        <div className="shipping-container-userinfo">
          <div className="main-heading">Fill the shipping details</div>
          <label className="shipping-label">Address</label>

          <br />

          <input
            type="text"
            className="shipping-input"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />

          <label className="shipping-label">City</label>

          <br />

          <input
            type="text"
            className="shipping-input"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />

          <label className="shipping-label">Postal Code</label>
          <br />
          <input
            type="text"
            className="shipping-input"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <br />

          <label className="shipping-label">Country</label>
          <br />
          <input
            type="text"
            className="shipping-input"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <br />
        </div>

        <div
          className="shipping-cotainer-billing"
          style={{ textAlign: "center" }}
        >
          <div className="main-heading">Billing</div>
          <div className="shipping-billing-layout">
            <div className="shipping-item-name-heading">Product</div>

            <div className="shipping-item-qty-heading">Quantity</div>
            <div className="shipping-item-price-heading">Price</div>

            {cartItems.map((item) => (
              <React.Fragment key={item.product}>
                <div className="shipping-itemname" key={item.product}>
                  {item.name}
                </div>
                <div className="shipping-itemqty">{item.qty}</div>
                <div className="shipping-itemprice">
                  {Rupees(item.qty * item.price)}
                </div>
              </React.Fragment>
            ))}
          </div>

          <Elements stripe={stripePromise}>
            <StripeForm
              price={Rupees(price)}
              placeOrderHandler={placeOrderHandler}
              isLoading={isLoading}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
