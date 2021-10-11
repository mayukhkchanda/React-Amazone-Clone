import React, { useEffect, useState } from "react";
import "./css/ProductShow.css";
import Loader from "../components/Loader";

import { connect } from "react-redux";
import { fetchProduct, addProductToBasket } from "../actions";
import Subtotal from "../components/Subtotal";
import Stars from "../components/Product/Stars";

const ProductShow = ({
  match: { params },
  product,
  fetchProduct,
  addProductToBasket,
}) => {
  const [Height, setHeight] = useState();
  const [TitleFont, setTitleFont] = useState();
  const [PriceFont, setPriceFont] = useState();
  const [DescFont, setDescFont] = useState();
  const [BriefFont, setBriefFont] = useState();

  /**Setup and window resize event listener */
  useEffect(() => {
    const resizeImage = () => {
      const width = window.innerWidth;

      /**Make the Image size, font size reponsive */
      if (width > 600) {
        // console.log("Resizing...");
        setHeight(parseInt(0.46 * width - 151.67));
        setTitleFont(Math.min(0.00057 * width + 0.72, 1.49));
        setPriceFont(Math.min(0.00092 * width + 0.21, 1.1));
        setDescFont(Math.min(0.00035 * width + 0.9, 1.375));
        setBriefFont(Math.min(0.0002 * width + 0.79, 1.05));
      }
    };
    window.addEventListener("resize", resizeImage);
    return () => {
      window.removeEventListener("resize", resizeImage);
    };
  }, []);

  /**Fetch product with given id */
  useEffect(() => {
    if (params?.id) {
      fetchProduct(params.id);
    }
  }, [params?.id]);

  if (!product || product === {}) {
    return <Loader />;
  }

  /**trim description upto 150 words */
  const trim = (sentence) => {
    return sentence.substr(0, 150) + "...";
  };

  /**call back for sub-total button-1 and redirects to checkout */
  const btnClickCallBack1 = () => {
    if (product && product !== {}) addProductToBasket(product, "checkout");
  };

  /**call back for sub-total button-2 redirects to payments */
  const btnClickCallBack2 = () => {
    if (product && product !== {}) addProductToBasket(product, "payments");
  };

  return (
    <div className="productShow">
      {/* Product display */}
      <div className="productShow__product">
        {/* Product image */}
        <div className="product__image">
          <img
            src={product.image}
            alt={product.title}
            style={{ height: `${Height}px` }}
          />
        </div>

        {/* Product description */}
        <div className="product__description">
          {/* Title */}
          <div
            className="description__title"
            style={{ fontSize: `${TitleFont}em` }}
          >
            {product.title}
          </div>

          {/* Price */}
          <div
            className="description__price"
            style={{ fontSize: `${PriceFont}em` }}
          >
            <div className="price__info">
              <span>Price:</span>
              <small className="color-red font-medium">$</small>
              <strong className="color-red font-medium">{product.price}</strong>
            </div>
            <Stars numStars={Math.trunc(product.rating.rate)} />
          </div>

          {/* In stock text */}
          <div
            className="description__stocki"
            style={{ fontSize: `${PriceFont}em` }}
          >
            <span className="stocki_text1">In stock.</span>
            <span className="stocki_text2">Order it now.</span>
          </div>

          {/* Description */}
          <div className="description__brief">
            <h2 style={{ fontSize: `${DescFont}em` }}>Description</h2>
            <span style={{ fontSize: `${BriefFont}em` }}>
              {trim(product.description)}
            </span>
          </div>
        </div>
      </div>

      <Subtotal
        btnText1="Add to Cart"
        btnClickCallBack1={btnClickCallBack1}
        btnText2="Buy Now"
        btnClickCallBack2={btnClickCallBack2}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { product: state.products[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchProduct, addProductToBasket })(
  ProductShow
);
