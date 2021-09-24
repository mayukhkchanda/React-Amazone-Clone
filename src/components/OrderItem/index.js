import React from "react";
import "./css/index.css";

/** TODO - FOrmat data amd fill */
const OrderItem = ({
  order_meta: { products = [], order_time, order_amount, order_id },
}) => {
  const renderProductPictures = () => {
    return products.map((product) => (
      <img className="item__picture" src={product.image} alt={product.title} />
    ));
  };

  return (
    <div className="order__item">
      <div className="item__header">
        <div className="item__header--left">
          <div className="item__header__block">
            <div className="item__header__block--top">ORDER PLACED</div>
            <div className="item__header__block--bottom">{order_time}</div>
          </div>

          <div className="item__header__block">
            <div className="item__header__block--top">TOTAL</div>
            <div className="item__header__block--bottom">
              {`$${order_amount} - Next Day Delivery`}
            </div>
          </div>
        </div>

        <div className="item__header--right">
          <div className="item__id">Order # cbx1232131231sdf45s6df4s645</div>
          <div className="item__number">{`${products.length} items`}</div>
        </div>
      </div>

      <div className="item__pictures">{renderProductPictures()}</div>
    </div>
  );
};

export default OrderItem;
