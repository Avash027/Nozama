import axios from "axios";

import {
  GET_ALL_PRODUCTS,
  ALL_PRODUCT_RECEIVED,
  PRODUCT_ERROR_OCCURED,
  GET_SPECIFIC_PRODUCT,
  SPECIFIC_PRODUCT_RECEIVED,
  SPECIFIC_PRODUCT_ERROR,
} from "../constants/productConstants.js";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: ALL_PRODUCT_RECEIVED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR_OCCURED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ProductDetails = (_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPECIFIC_PRODUCT });

    const { data } = await axios.get(`/api/products/${_id}`);

    dispatch({
      type: SPECIFIC_PRODUCT_RECEIVED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SPECIFIC_PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
