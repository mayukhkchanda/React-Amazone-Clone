import React from "react";
import "./css/Basket.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Basket({ basket = [] }) {
  return (
    <Link to="/checkout" className="header__basket">
      <span className="basket__icon">
        <ion-icon name="basket"></ion-icon>
      </span>
      <span className="basket__number">{basket.length}</span>
    </Link>
  );
}

const mapStateToProps = (state) => {
  return { basket: Object.values(state.basket) };
};

export default connect(mapStateToProps, {})(Basket);
