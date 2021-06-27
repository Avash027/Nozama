import axios from "axios";

export const _PlaceOrder = async (
  address,
  city,
  postalCode,
  country,
  userInfo,
  cartItems,
  totalPrice
) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    if (
      address.length === 0 ||
      city.length === 0 ||
      country.length === 0 ||
      postalCode.length === 0
    ) {
      throw new Error("Invalid address");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };

    const orderItem = {
      user: userInfo._id,
      orderItems: cartItems.map(({ qty, product, name, image }) => {
        return { qty, product, name, image };
      }),
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
      totalPrice: totalPrice,
      isDelivered: false,
      orderedAt: new Date(),
    };

    const { data } = await axios.post("/api/orders", { orderItem }, config);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const _updateProductsQty = async (cartItems) => {
  try {
    const updateItems = cartItems.map((item) => {
      return { qty: item.qty, productID: item.product };
    });

    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };

    const body = {
      updateItems,
    };

    const { data } = await axios.post("/api/products/updateQty", body, config);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
