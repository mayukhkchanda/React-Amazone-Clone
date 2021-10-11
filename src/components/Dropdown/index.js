import React, { useEffect, useRef, useState } from "react";
import "./css/index.css";

const Dropdown = ({
  menuOptions = [],
  isDropdownVisible,
  handlePriceRangeFilter,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const DropdownRef = useRef(null);

  /**Close dropdown after being hidden */
  useEffect(() => {
    // if the menu is visible nd dropdown is not visible then close it
    if (!isDropdownVisible && isMenuVisible) {
      setMenuVisible(false);
    }
  }, [isDropdownVisible]);

  useEffect(() => {
    const onBtnClick = (e) => {
      if (
        DropdownRef &&
        DropdownRef?.current &&
        DropdownRef?.current.contains(e.target)
      ) {
        return;
      }
      setMenuVisible(false);
    };

    document.body.addEventListener("click", onBtnClick);

    return () => {
      document.body.removeEventListener("click", onBtnClick);
    };
  }, []);

  const onBtnClick = () => {
    setMenuVisible(!isMenuVisible);
  };

  const renderMenuOptions = () => {
    return menuOptions.map((option) => (
      <div
        className="menu__option"
        onClick={option.optionClbck}
        key={option.optionText}
      >
        {option.optionText}
      </div>
    ));
  };

  const [MinPrice, setMinPrice] = useState("");
  const [MaxPrice, setMaxPrice] = useState("");

  const priceRangeFilterClbck = () => {
    // call price range callback function
    handlePriceRangeFilter(MinPrice, MaxPrice);

    // clear value
    setMaxPrice("");
    setMinPrice("");
  };

  return (
    <div className="dropdown" ref={DropdownRef}>
      <button onClick={onBtnClick} className="dropdown__btn">
        Sort By
      </button>
      <div className={`dropdown__menu ${isMenuVisible ? "" : "hidden"}`}>
        {renderMenuOptions()}

        <div className="menu__option price">
          <div className="menu__option__price__title">Price Range:</div>
          <div className="submenu__price">
            <div className="submenu__price--row">
              <input
                type="text"
                value={MinPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min($)"
              />
            </div>
            <div className="submenu__price--row">
              <input
                type="text"
                value={MaxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max($)"
              />
            </div>
            <button className="submenu__btn" onClick={priceRangeFilterClbck}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
