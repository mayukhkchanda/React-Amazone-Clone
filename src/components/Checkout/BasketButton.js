import React from "react";
import "./css/BasketButton.css";

const Button = ({ onButtonClick, btnText }) => {
  return (
    <button onClick={onButtonClick} className="basket--button">
      {btnText}
    </button>
  );
};

export default Button;
