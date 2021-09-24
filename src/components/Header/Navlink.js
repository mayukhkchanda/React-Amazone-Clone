import React from "react";
import "./css/Navlink.css";

function Navlink({ text1, text2, isMobileView, onBtnClick }) {
  const handleBtnClick = () => {
    // call props function if passed
    if (onBtnClick) {
      onBtnClick();
    }
  };

  return (
    <div
      onClick={handleBtnClick}
      className={`nav__navLink ${isMobileView ? "mobile-only" : ""}`}
    >
      <span className="navLink__text1">{text1}</span>
      <span className="navLink__text2">{text2}</span>
    </div>
  );
}

export default Navlink;
