import React from "react";
import "./css/index.css";
import Quantity from "./Quantity";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  addProductToBasket,
  removeProductFromBasket,
  decreaseProdQtyInBasket,
} from "../../actions";
import { connect } from "react-redux";
import Stars from "./Stars";

/**
 *
 * @param data -> Passed through props
 * @param isLandscape -> Passed through props
 * @returns
 */
const Product = ({
  data: { id, title, price, description, category, image, rating },
  basket,
  isLandscape,
  addProductToBasket,
  removeProductFromBasket,
  decreaseProdQtyInBasket,
}) => {
  /** Get the path of the current page */
  const location = useLocation();

  /* handle button click and call action creator depending upon the location */
  const handleButtonClick = (event) => {
    event.stopPropagation();

    /* call add to basket Action creator here if on the homepage */
    if (location.pathname === "/") {
      const product = {
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
      };
      addProductToBasket(product, "checkout");
    } else if (
      location.pathname === "/checkout" ||
      location.pathname === "/payments"
    ) {
      /*If on the checkout page then call remove action creator here  */
      removeProductFromBasket(id);
    }
  };

  /**
   * @returns the text to be shown inside the button
   */
  const renderBtnText = () => {
    if (
      location.pathname === "/checkout" ||
      location.pathname === "/payments"
    ) {
      return "Remove";
    }

    return "Add to Basket";
  };

  // increase the product quantity //DONOT redirect to any route
  const handleIncreaseBtnClick = () => {
    const product = { id, title, price, description, category, image, rating };
    addProductToBasket(product);
  };

  // decrease the product quantity
  const handleDecreaseBtnClick = () => {
    const product = { id, title, price, description, category, image, rating };
    decreaseProdQtyInBasket(product);
  };

  /**
   * @returns the quantity component if on checkout page
   */
  const renderQuantityBtn = () => {
    if (location.pathname === "/checkout") {
      return (
        <Quantity
          handleIncreaseBtnClick={handleIncreaseBtnClick}
          handleDecreaseBtnClick={handleDecreaseBtnClick}
          qty={basket[id].quantity}
        />
      );
    } else if (location.pathname === "/payments") {
      return (
        <div className="quantity__text--payments">
          <span>Qty:</span>
          <span>{basket[id].quantity}</span>
        </div>
      );
    }

    return null;
  };

  /**
   * render's a link-wrappered image if user is on homepage.
   * Else returns only the component itself.
   */
  const renderProductImage = () => {
    const imageComponent = (
      <div className="product__image">
        <img src={image} alt={title} />
      </div>
    );

    if (location.pathname === "/") {
      return <Link to={`/product/${id}`}>{imageComponent}</Link>;
    }

    return imageComponent;
  };

  /**
   * @returns the rendered component
   */
  const renderComponent = () => {
    return (
      <div
        className={`product ${isLandscape ? "landscape" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Product image */}
        {renderProductImage()}

        {/* Product description */}
        <div
          className={`product__description ${isLandscape ? "landscape" : ""}`}
        >
          {/* Product title */}
          <div className="description__title">{title}</div>

          {/* Product price  */}
          <div className="description__price">
            <small>$</small>
            <strong>{price}</strong>
          </div>

          {/* Product stars  */}

          <Stars numStars={Math.trunc(rating.rate)} />

          {/* Product quantity */}
          {renderQuantityBtn()}

          {/* Product button */}
          <div
            className={`description__button ${isLandscape ? "landscape" : ""}`}
          >
            <button onClick={(event) => handleButtonClick(event)}>
              {renderBtnText()}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return renderComponent();
};

const mapStateToProps = (state) => {
  return { basket: state.basket };
};

export default connect(mapStateToProps, {
  addProductToBasket,
  removeProductFromBasket,
  decreaseProdQtyInBasket,
})(Product);
