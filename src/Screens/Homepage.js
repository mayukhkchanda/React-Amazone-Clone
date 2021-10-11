import React, { useEffect, useState } from "react";
import "./css/Homepage.css";
import Banner from "../components/Homepage/Banner";
import Product from "../components/Product";
import Dropdown from "../components/Dropdown";

import { useWindowScroll } from "../hooks/useWindowScroll";

import { fetchProducts } from "../actions";
import { connect } from "react-redux";

const Homepage = ({ products = [], fetchProducts }) => {
  // used re-render component when applying filter by passing a new array
  const [Products, setProducts] = useState(products);

  //custom hook that tells when to show drop down based on the scroll value
  const isDropdownVisible = useWindowScroll();

  // fetch products when component is loaded
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const renderProducts = () => {
    const renderedProducts = Products.map((product) => (
      <Product key={product.title} data={product} />
    ));

    return <div className="showcase__row">{renderedProducts}</div>;
  };

  // helper function that returns a sort compare function based on the feild given
  const sort_by = (feild, reverse, parser) => {
    const reversed = reverse ? -1 : 1;
    return function (a, b) {
      return (parser(a[feild]) - parser(b[feild])) * reversed;
    };
  };

  // helper function to filter products with rating above given rating
  const filterByRating = (arr, rating) => {
    return arr.filter((el) => el?.rating.rate >= rating);
  };

  // helper function to filter products with rating above given rating
  const filterByPrice = (arr, min_price, max_price) => {
    return arr.filter((el) => el.price >= min_price && el.price <= max_price);
  };

  /**
   * https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update
   * Sort function does not create a new array rather sorts the array in-place and assigns
   * the same memory location to the new variable. This causes Redux(also react state) to
   * think that the new object is the same as the old object and it does not re-renders the component.
   * React state uses Object.is comparsion algorithm(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description).
   * As both the new objects and old objects memory location are same so the component are not re-rendered even after state update.
   * To counter this problem first slice the array to create a copy and then sort the copied array(https://stackoverflow.com/a/46414940).
   */
  // sort products by price in descending order
  const menuOptionCallback1 = () => {
    const sorted_products = products
      .slice(0)
      .sort(sort_by("price", true, parseFloat));
    setProducts(sorted_products);
  };

  // sort products by price in ascending order
  const menuOptionCallback2 = () => {
    const sorted_products = products
      .slice(0)
      .sort(sort_by("price", false, parseFloat));
    setProducts(sorted_products);
  };

  // filter products by average rating
  const menuOptionCallback3 = () => {
    let average_rating = 0;

    products.forEach((product) => (average_rating += product.rating.rate));
    average_rating = average_rating / products.length;
    average_rating = parseFloat(average_rating).toFixed(1);
    const filtered_products = filterByRating(products, average_rating);

    setProducts(filtered_products);
  };

  const menuOptionCallback4 = () => {
    const filtered_products = filterByPrice(products, 0, 499);
    setProducts(filtered_products);
  };

  const menuOptionCallback5 = () => {
    const filtered_products = filterByPrice(products, 499, 1000);
    setProducts(filtered_products);
  };

  /** Callback for price range filter */
  const handlePriceRangeFilter = (min = 0, max = 1000) => {
    // parse inputs
    min = parseFloat(min);
    max = parseFloat(max);

    // handle bad input
    if (!min || !max || min > max) {
      min = parseFloat(0);
      max = parseFloat(999);
    }

    // filter products by min and max price and sort the filtered products
    const filtered_products = filterByPrice(products, min, max).sort(
      sort_by("price", false, parseFloat)
    );

    //set the products
    setProducts(filtered_products);
  };

  const menuOptions = [
    { optionText: "Price: High to Low", optionClbck: menuOptionCallback1 },
    { optionText: "Price: Low to High", optionClbck: menuOptionCallback2 },
    { optionText: "Avg. Customer Review", optionClbck: menuOptionCallback3 },
    { optionText: "Price: $0 to $499", optionClbck: menuOptionCallback4 },
    { optionText: "Price: $500 and above", optionClbck: menuOptionCallback5 },
  ];

  return (
    <div className="homepage">
      <div className="homepage--wrapper">
        <div
          className={`dropdown-wrapper ${isDropdownVisible ? "" : "hidden"}`}
        >
          <Dropdown
            menuOptions={menuOptions}
            isDropdownVisible={isDropdownVisible}
            handlePriceRangeFilter={handlePriceRangeFilter}
          />
        </div>
        <Banner />
        <div className="homepage__showcase">{renderProducts()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { products: Object.values(state.products) };
};

export default connect(mapStateToProps, {
  fetchProducts,
})(Homepage);
