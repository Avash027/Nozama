import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { useSelector } from "react-redux";

import {
  _getOrdersUtil,
  _updateDeliveryStatusUtil,
} from "../../utils/orderPanelAPI";

import OrderItem from "./OrderItem";

const Loading = loadable(() => import("../Others/Loading"));
const Error = loadable(() => import("../Others/Error"));

const OrderPanel = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [orders, setOrders] = useState([]);
  const [loadorderPanel, setLoadorderPanel] = useState(true);
  const [errorPanel, setErrorPanel] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      if (!userInfo) return setErrorPanel(true);
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
        {orders.map((order) => (
          <OrderItem
            data={order}
            userInfo={userInfo}
            updateDeliveryStatus={updateDeliveryStatus}
          />
        ))}
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
