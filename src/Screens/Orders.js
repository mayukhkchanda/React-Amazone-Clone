import React from "react";
import OrderItem from "../components/OrderItem";
import "./css/Orders.css";
import EmptyBasket from "../components/EmptyBakset";

import { connect } from "react-redux";

const Orders = ({ orders = [] }) => {
  console.log(orders);

  const renderOrderItems = () => {
    const renderedItems = orders.map((order) => {
      return <OrderItem key={order.order_id} order_meta={order} />;
    });

    return renderedItems;
  };

  if (orders.length < 1) {
    return <EmptyBasket text="You have placed no orders with us." />;
  }

  return (
    <div className="orders">
      <div className="orders__header">
        <h3 className="orders__header__title">Your Orders</h3>
        <div className="orders__header__number">{`${orders.length} orders`}</div>
      </div>

      {renderOrderItems()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { orders: Object.values(state.orders) };
};

export default connect(mapStateToProps, {})(Orders);
