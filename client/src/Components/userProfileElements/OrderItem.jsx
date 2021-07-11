import React from "react";
import Rupees from "../../utils/Rupees";

const OrderItem = ({ data, userInfo, updateDeliveryStatus }) => {
  const {
    orderItems,
    totalPrice,
    shippingAddress,
    createdAt,
    isDelivered,
    _id,
    deliveredAt,
    stripeID,
  } = data;

  return (
    <div className="admin-panel" key={_id}>
      <div className="admin-panel-element-up">
        <div className="admin-panel-names">
          Product Name
          <hr />
          {orderItems &&
            orderItems.map(({ name, qty }, idx) => (
              <div key={idx}>{`${name} (${qty})`}</div>
            ))}
        </div>

        <div className="admin-panel-price">
          Total Price
          <hr />
          {Rupees(totalPrice)}
        </div>
      </div>

      <div className="admin-panel-element-down">
        <div className="admin-panel-shipping-address">
          {`Shipping Address : ${shippingAddress.address}, ${shippingAddress.postalCode}, ${shippingAddress.city}, ${shippingAddress.country}`}
        </div>

        <div className="admin-panel-user">{`Stripe Payment ID :  ${stripeID}`}</div>

        <div className="admin-panel-orderedAt">
          {`Ordered At : ${createdAt}`}
        </div>
        <div
          className="admin-panel-delivered"
          style={
            !isDelivered
              ? {
                  color: "Red",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }
              : {
                  color: "Green",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }
          }
        >
          Delivery Status : {isDelivered ? "Delivered" : "Not yet Delivered"}
        </div>
        {!isDelivered && userInfo && userInfo.isAdmin && (
          <div
            className="admin-panel-delivery-container"
            onClick={() => updateDeliveryStatus(_id)}
          >
            <i className="far fa-check-circle"></i> Order Delivered
          </div>
        )}
        {isDelivered && deliveredAt && (
          <div className="admin-panel-delivery-date">
            {`Delivered on : ${deliveredAt}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
