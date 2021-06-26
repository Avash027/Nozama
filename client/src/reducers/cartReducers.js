import {
  CART_ADD,
  CART_REMOVE,
  CART_REMOVE_ALL,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD:
      const item = action.payload; //Item to be added

      //If item already in cart

      const itemExsist = state.cartItems.find((itr) => {
        return itr.product === item.product;
      });

      if (itemExsist) {
        return {
          ...state,
          cartItems: state.cartItems.map((itr) =>
            itr.product === itemExsist.product ? item : itr
          ), //If item exsist return the exsisting item or return the new item
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (itr) => itr.product !== action.payload.product
        ),
      };

    case CART_REMOVE_ALL:
      return { cartItems: [] };
    default:
      return state;
  }
};
