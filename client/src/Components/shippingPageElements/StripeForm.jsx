import React from "react";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

const StripeForm = ({ price, placeOrderHandler, isLoading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const createPaymentMethod = async () => {
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!paymentMethod) throw new Error("Invalid card details");

      placeOrderHandler(paymentMethod.id);
    } catch (error) {
      alert("Check card details .Or contact admin");
    }
  };

  return (
    <>
      <div className="shipping-cardContainer">
        <label>Enter your credit card information</label>
        <CardElement></CardElement>
      </div>

      <div className="button-container" style={{ marginTop: "2rem" }}>
        <button
          className="button button-primary"
          onClick={(e) => createPaymentMethod()}
          disabled={!stripe}
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : ""} Pay{" "}
          {price}
        </button>
      </div>
    </>
  );
};

export default StripeForm;
