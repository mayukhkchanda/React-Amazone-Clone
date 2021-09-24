import React, { useEffect, useRef, useState } from "react";
import Product from "../components/Product";
import "./css/Payment.css";

import { connect } from "react-redux";
import { addOrders } from "../actions";

import { Redirect } from "react-router";

import { Formik } from "formik";

const Payment = ({ user_meta, is_signed_in, basket = [], addOrders }) => {
  const [addr, setAddress] = useState("");

  const [ReadOnly, setReadOnly] = useState(false);
  const addrInputRef = useRef(null);

  useEffect(() => {
    if (!ReadOnly && addrInputRef && addrInputRef.current) {
      addrInputRef.current.focus();
    }
  }, [ReadOnly, addrInputRef]);

  if (!is_signed_in) {
    return <Redirect to="/signin/payments" />;
  }

  const toggleInputEdit = () => {
    if (addr && addr.trim()) setReadOnly(!ReadOnly);
  };

  // render the products in the basket if not empty
  const renderShoppedProducts = () => {
    const renderedProducts = basket.map((product) => (
      <Product key={product.id} data={product} isLandscape />
    ));

    return renderedProducts;
  };

  const getTotalPrice = () => {
    let total = 0;
    basket.forEach((item) => {
      total += item.price * item.quantity;
    });
    return parseFloat(total).toFixed(2);
  };

  const onConfirmOrder = () => {
    if (addr && basket.length > 0) {
      addOrders(getTotalPrice());
    }
  };

  return (
    <div className="payments">
      <h2 className="payments__header">{`Checkout(${basket.length} ${
        basket.length === 1 ? `item` : `items`
      })`}</h2>

      {/**Form start */}

      <Formik
        initialValues={{ address: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.address) {
            errors.address = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="payments__info">
              <div className="info__row">
                <div className="info__row--left">Delivery Address</div>
                <div className="info__row--right flexRow">
                  <span
                    className={`info__row--right__address ${
                      !ReadOnly ? "hidden" : ""
                    }`}
                  >
                    {addr}
                    <button
                      onClick={toggleInputEdit}
                      className="info__row--right__edit"
                    >
                      <ion-icon name="create"></ion-icon>
                    </button>
                  </span>
                  <input
                    className="info__row--right__input"
                    type="text"
                    name="address"
                    value={addr}
                    ref={addrInputRef}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={toggleInputEdit}
                    hidden={ReadOnly}
                  />
                </div>
              </div>

              <div className="info__row border-topBottom">
                <div className="info__row--left">Review items and delivery</div>
                <div className="info__row--right">
                  {renderShoppedProducts()}
                </div>
              </div>

              <div className="info__row">
                <div className="info__row--left">Payment Method</div>
                <div className="info__row--right">
                  <div className="info__row--payment__options">
                    <span>Cash on Delivery</span>
                    <input type="radio" name="COD" id="COD" />
                  </div>
                  <div className="info__row__order">
                    Order Total: ${getTotalPrice()}
                  </div>
                  <button
                    onClick={onConfirmOrder}
                    className="info__row--right__confirmBtn"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {/** Form end */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user_meta: state.user_meta,
    is_signed_in: state.is_signed_in,
    basket: Object.values(state.basket),
  };
};

export default connect(mapStateToProps, { addOrders })(Payment);
