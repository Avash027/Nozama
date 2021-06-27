import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART_ALL,
} from "../constants/cartConstants";

/**
 * IF item already present in the cart update the quantity else add the item to cart
 */

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const item = action.payload; //Item to be added

      //If item already in cart

      const itemExsist = state.cartItems.find((itemInCart) => {
        return itemInCart.product === item.product;
      });

      if (itemExsist) {
        return {
          ...state,
          cartItems: state.cartItems.map((itemInCart) =>
            itemInCart.product === itemExsist.product ? item : itemInCart
          ), //If item exsist return the exsisting item or return the new item
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
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
