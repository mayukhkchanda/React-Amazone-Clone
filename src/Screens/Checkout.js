import React from "react";
import "./css/Checkout.css";
import Product from "../components/Product";
import EmptyBasket from "../components/EmptyBakset";

import { connect } from "react-redux";
import Subtotal from "../components/Subtotal";

import history from "../history";

function Checkout({ basket = [] }) {
  /** Component when basket is empty */
  if (basket.length < 1) {
    return <EmptyBasket text="Your Amazon Basket is empty" />;
  }

  // render the products in the basket if not empty
  const renderShoppedProducts = () => {
    const renderedProducts = basket.map((product) => (
      <Product key={product.id} data={product} isLandscape />
    ));

    return renderedProducts;
  };

  /** Navigate to payments page */
  const btnClickCallBack1 = () => {
    history.push("/payments");
  };

  /** Navigate to homepage */
  const btnClickCallBack2 = () => {
    history.push("/");
  };

  // get the price and quantity info of the elements in the basket
  const getSubtotalInfo = () => {
    if (basket.length > 0) {
      const numItems = basket.length;
      let totalPrice = 0;

      basket.forEach((item) => {
        totalPrice += item?.quantity * item?.price;
      });

      return { items: numItems, total: parseFloat(totalPrice).toFixed(2) };
    }

    return null;
  };

  return (
    <div className="basket">
      <div className="basket__product">
        <h2>Shopping Cart</h2>
        <span className="basket__product__hr" />
        {renderShoppedProducts()}
      </div>
      <Subtotal
        SubtotalInfo={getSubtotalInfo()}
        btnText1="Proceed to Buy"
        btnClickCallBack1={btnClickCallBack1}
        btnText2="Continue Shopping"
        btnClickCallBack2={btnClickCallBack2}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { basket: Object.values(state.basket) };
};

export default connect(mapStateToProps, {})(Checkout);
