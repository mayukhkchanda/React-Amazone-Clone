import React from "react";
import "./css/index.css";

const OrderConfirmMsg = () => {
  return (
    <div className="order">
      <div className="order__header">
        <span className="order__header__icon">
          <ion-icon name="checkmark-circle"></ion-icon>
        </span>

        <h4 className="order__header__text">
          Thank you, you're order has been confirmed.
        </h4>
      </div>

      <p className="order__message">
        Thank you for shopping with us. We'll send a confirmation once your
        order has been shipped. You can check out the status of your order from
        the link below.
      </p>

      <button className="order__link">Go to my orders</button>
    </div>
  );
};

export default OrderConfirmMsg;
