import React from "react";
import "./css/Quantity.css";

const Quantity = ({ handleIncreaseBtnClick, handleDecreaseBtnClick, qty }) => {
  return (
    <div className="product__quantity">
      <button
        className="quantity__button decrease"
        onClick={handleDecreaseBtnClick}
      >
        <ion-icon name="remove"></ion-icon>
      </button>

      <div className="quantity__text">
        <span>Qty:</span>
        <span>{qty}</span>
      </div>

      <button
        className="quantity__button increase"
        onClick={handleIncreaseBtnClick}
      >
        <ion-icon name="add"></ion-icon>
      </button>
    </div>
  );
};

export default Quantity;
