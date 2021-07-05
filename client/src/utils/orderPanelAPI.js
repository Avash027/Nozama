import axios from "axios";

export const _updateDeliveryStatusUtil = async (token, _id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const body = {
    _id,
    deliveryTime: new Date(),
  };

  try {
    const { data } = await axios.put("/api/orders", body, config);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const _getOrdersUtil = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const { data } = await axios.get("/api/orders", config);

  return data;
};
