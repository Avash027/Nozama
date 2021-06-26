import axios from "axios";

import {
  CART_ADD,
  CART_REMOVE,
  CART_REMOVE_ALL,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE,
    payload: {
      product: id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCartAll = () => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ALL,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
