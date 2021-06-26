import {
  GET_ALL_PRODUCTS,
  ALL_PRODUCT_RECEIVED,
  PRODUCT_ERROR_OCCURED,
  GET_SPECIFIC_PRODUCT,
  SPECIFIC_PRODUCT_RECEIVED,
  SPECIFIC_PRODUCT_ERROR,
} from "../constants/productConstants.js";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { loading: true, products: [] };
    case ALL_PRODUCT_RECEIVED:
      return { loading: false, products: action.payload };
    case PRODUCT_ERROR_OCCURED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { products: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case GET_SPECIFIC_PRODUCT:
      return { loading: true, ...state };
    case SPECIFIC_PRODUCT_RECEIVED:
      return { loading: false, product: action.payload };
    case SPECIFIC_PRODUCT_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
