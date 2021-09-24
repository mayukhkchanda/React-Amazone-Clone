import React, { useEffect } from "react";
import "./css/Homepage.css";
import Banner from "../components/Homepage/Banner";
import Product from "../components/Product";

import { fetchProducts } from "../actions";
import { connect } from "react-redux";

const Homepage = ({ Products = [], fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  const rendeProducts = () => {
    const renderedProducts = Products.map((product) => (
      <Product key={product.title} data={product} />
    ));

    return <div className="showcase__row">{renderedProducts}</div>;
  };

  return (
    <div className="homepage">
      <div className="homepage--wrapper">
        <Banner />
        <div className="homepage__showcase">{rendeProducts()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Products: Object.values(state.products) };
};

export default connect(mapStateToProps, {
  fetchProducts,
})(Homepage);
