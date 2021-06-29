import React, { useState } from "react";
import Rupees from "../utils/Rupees";

const CartItem = ({ item, changeItemQuantity, removeFromCartHandler }) => {
  const [Qty, setQty] = useState(item.qty);

  const cartItemChanger = (e) => {
    setQty(e.target.value);
    changeItemQuantity(e, item);
  };

  return (
    <div>
      <div key={item.productID} className="cart-item">
        <div className="cart-item-container">
          <img
            src={item.image}
            className="cart-item-container-img"
            alt={item.name}
          ></img>
        </div>

        <div className="cart-item-info">
          <div className="cart-item-info-left">
            <div className="primary-heading">{item.name}</div>
            <div className="secondary-heading">{Rupees(item.price)}</div>
          </div>
          <div className="cart-item-info-right">
            <div className="cart-item-info-right-up">
              <select
                value={Qty}
                className="cart-item-info-right-up-select"
                onChange={(e) => cartItemChanger(e)}
              >
                {[...Array(item.countInStock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="cart-item-info-right-down">
              <i
                className="fas fa-trash-alt cart-item-info-right-down-delete"
                onClick={() => removeFromCartHandler(item.product)}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
