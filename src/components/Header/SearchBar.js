import React from "react";
import "./css/SearchBar.css";

function SearchBar({ isMobileView }) {
  return (
    <div className={`header__searchBar ${isMobileView ? "mobile-only" : ""}`}>
      <input type="text" className="searchBar__input" />
      <span className="searchBar__icon">
        <ion-icon name="search"></ion-icon>
      </span>
    </div>
  );
}

export default SearchBar;
