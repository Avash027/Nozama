import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Notification from "../utils/Notification";
import NotificationSystem from "react-notification-system";

import { removeFromCartAll } from "../actions/cartActions";
import { _PlaceOrder, _updateProductsQty } from "../utils/ShippingPageAPI";
import Rupees from "../utils/Rupees";

import StripeForm from "../Components/shippingPageElements/StripeForm";
import axios from "axios";

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();
  const notificationSystem = React.createRef();

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
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [stripePublicKey, setstripePublicKey] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/orders/key");
      setstripePublicKey(data.key);
    })();
  }, []);

  let stripePromise;
  if (stripePublicKey.length !== 0) stripePromise = loadStripe(stripePublicKey);

  useEffect(() => {
    if (!success) return;
    Notification(notificationSystem, "success", "Order placed", "");
    setSuccess(false);
    setIsLoading(false);
  }, [success, history, notificationSystem]);

  useEffect(() => {
    if (!failure) return;
    Notification(notificationSystem, "error", "Order could not be placed", "");
    setFailure(false);
    setIsLoading(false);
  }, [failure, history, notificationSystem]);

  const placeOrderHandler = async (stripeID) => {
    setIsLoading(true);
    setDisableButton(true);
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
      setFailure(true);
      return;
    }

    setIsLoading(false);
    setDisableButton(false);

    dispatch(removeFromCartAll());
    setSuccess(true);
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
      <NotificationSystem ref={notificationSystem} />
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
            required={true}
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
            required={true}
          />
          <br />

          <label className="shipping-label">Postal Code</label>
          <br />
          <input
            type="number"
            className="shipping-input"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required={true}
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
            required={true}
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

          {stripePublicKey.length !== 0 && (
            <Elements stripe={stripePromise}>
              <StripeForm
                price={Rupees(price)}
                placeOrderHandler={placeOrderHandler}
                isLoading={isLoading}
                disableButton={disableButton}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
