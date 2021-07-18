import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART_ALL,
} from "../constants/cartConstants";

/**
 *@description If item already present in the cart update the quantity else add the item to cart
 */

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const item = action.payload;
      let finalState = {};

      const itemExsist = state.cartItems.find((itemInCart) => {
        return itemInCart.product === item.product;
      });

      if (itemExsist) {
        finalState = {
          ...state,
          cartItems: state.cartItems.map((itemInCart) =>
            itemInCart.product === itemExsist.product ? item : itemInCart
          ), //If item exsist return the exsisting item or return the new item
        };
      } else {
        finalState = {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

      return finalState;

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (itr) => itr.product !== action.payload.product
        ),
      };

    case REMOVE_ITEM_FROM_CART_ALL:
      return { cartItems: [] };
    default:
      return state;
  }
};
