import React from "react";
import "./css/index.css";

import BasketButton from "../Checkout/BasketButton";

import history from "../../history";

const EmptyBasket = ({ text }) => {
  /** Navigate to Sign-in page */
  const onSignInButtonClick = () => {
    history.push("/signin");
  };

  /** Navigate to Sign-up page */
  const onSignUpButtonClick = () => {
    history.push("/signup");
  };

  const onCtnShopBtnClick = () => {
    history.push("/");
  };

  return (
    <div className="basket--empty">
      <div className="basket--empty--left">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/empty_basket.svg`}
          alt="empty basket"
        />
      </div>

      <div className="basket--empty--right">
        <h2>{text}</h2>

        <div className="button__container">
          <div className="button__container--row">
            <BasketButton
              btnText="Continue Shopping"
              onButtonClick={onCtnShopBtnClick}
            />
          </div>
          <div className="button__container--row">
            <BasketButton
              btnText="Sign In to account"
              onButtonClick={onSignInButtonClick}
            />
            <BasketButton
              btnText="Sign Up"
              onButtonClick={onSignUpButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyBasket;
