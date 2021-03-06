import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

const iframeStyles = {
  base: {
    color: "#1e3a8a",
    fontSize: "20px",
    iconColor: "#1e3a8a",
    "::placeholder": {
      color: "#87bbfd",
    },
  },
  invalid: {
    iconColor: "red",
    color: "red",
  },
  complete: {
    iconColor: "green",
  },
};

const cardElementOpts = {
  iconStyle: "solid",
  style: iframeStyles,
  hidePostalCode: true,
};

const StripeForm = ({ price, placeOrderHandler, isLoading, disableButton }) => {
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
      <label>Pay through your credit card</label>
      <div className="shipping-cardContainer">
        <CardElement options={cardElementOpts}></CardElement>
      </div>

      <div className="button-container" style={{ marginTop: "2rem" }}>
        <button
          className="button button-primary"
          onClick={(e) => createPaymentMethod()}
          disabled={!stripe || disableButton}
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : ""} Pay{" "}
          {price}
        </button>
      </div>
    </>
  );
};

export default StripeForm;
