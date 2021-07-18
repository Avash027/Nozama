import axios from "axios";

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART_ALL,
} from "../constants/cartConstants";

/***
 * @description : It adds a specific product to the cart of the user. If the time is already
 * present then the amount is updated
 * @arguments id qty
 * @returns none
 * @async yes
 */

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_ITEM_TO_CART,
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

/***
 * @description : It removes the item with the specific id from the cart
 * @argument id
 * @returns none
 * @async no
 */

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: {
      product: id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/***
 * @description : It removes all the item from the cart
 * @argument none
 * @returns none
 * @async no
 */

export const removeFromCartAll = () => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART_ALL,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
