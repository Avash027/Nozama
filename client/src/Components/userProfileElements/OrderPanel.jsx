import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { useSelector } from "react-redux";

import {
  _getOrdersUtil,
  _updateDeliveryStatusUtil,
} from "../../utils/orderPanelAPI";

const Loading = loadable(() => import("../Others/Loading"));
const Error = loadable(() => import("../Others/Error"));

//TODO add order item to separate file

const OrderPanel = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [orders, setOrders] = useState([]);
  const [loadorderPanel, setLoadorderPanel] = useState(true);
  const [errorPanel, setErrorPanel] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const orderDetails = await _getOrdersUtil(userInfo.token);
      if (orderDetails) {
        setOrders(orderDetails);
        setLoadorderPanel(false);
      } else {
        setErrorPanel(true);
      }
    };

    getOrders();
  }, [userInfo]);

  const updateDeliveryStatus = async (_id) => {
    const [data, error] = await _updateDeliveryStatusUtil(userInfo.token, _id);

    if (error) {
      return alert("Cannot be processed now" + error);
    }
    const updatedOrders = [...orders];
    const index = updatedOrders.findIndex((order) => order._id === _id);
    updatedOrders[index] = data;
    setOrders(updatedOrders);
  };

  let ordersElements;
  if (loadorderPanel) ordersElements = <Loading></Loading>;
  else if (errorPanel) ordersElements = <Error></Error>;
  else if (orders.length === 0) ordersElements = <h2>No orders</h2>;
  else {
    console.log(orders);
    ordersElements = (
      <>
        {orders.map(
          ({
            orderItems,
            totalPrice,
            shippingAddress,
            user,
            createdAt,
            isDelivered,
            _id,
            deliveredAt,
            stripeID,
          }) => (
            <div className="admin-panel" key={_id}>
              <div className="admin-panel-element-up">
                <div className="admin-panel-names">
                  Product Name
                  <hr />
                  {orderItems &&
                    orderItems.map(({ name, qty }) => (
                      <div key={_id + name + qty}>{`${name} (${qty})`}</div>
                    ))}
                </div>

                <div className="admin-panel-price">
                  Total Price
                  <hr />
                  Rs {totalPrice}
                </div>
              </div>

              <div className="admin-panel-element-down">
                <div className="admin-panel-shipping-address">
                  {`Shipping Address : ${shippingAddress.address}, ${shippingAddress.postalCode}, ${shippingAddress.city}, ${shippingAddress.country}`}
                </div>

                {userInfo && userInfo && (
                  <div className="admin-panel-user">{`Stripe Payment ID :  ${stripeID}`}</div>
                )}

                <div className="admin-panel-orderedAt">
                  {`Ordered At : ${createdAt}`}
                </div>

                <div
                  className="admin-panel-delivered"
                  style={
                    !isDelivered && {
                      color: "Red",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }
                  }
                >
                  Delivery Status :{" "}
                  {isDelivered ? "Delivered" : "Not yet Delivered"}
                </div>

                {!isDelivered && userInfo?.isAdmin && (
                  <div
                    className="admin-panel-delivery-container"
                    onClick={() => updateDeliveryStatus(_id)}
                  >
                    <i className="far fa-check-circle"></i> Order Delivered
                  </div>
                )}

                {isDelivered && (
                  <div className="admin-panel-delivery-date">
                    {`Delivered on : ${deliveredAt}`}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </>
    );
  }

  return (
    <div>
      <div className="main-heading" style={{ textAlign: "center" }}>
        Orders Status
      </div>

      {ordersElements}
    </div>
  );
};

export default OrderPanel;
