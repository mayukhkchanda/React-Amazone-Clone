import React from "react";
import "./css/index.css";

/**
 * @param {*} btnText1(String)            : Button 1 text(will not render Button if not passed)
 * @param {*} btnText2(String)            : Button 2 text(will not render Button if not passed)
 * @param {*} btnClickCallBack1(function) : Button 1 on click function
 * @param {*} btnClickCallBack2(function) : Button 2 on click function
 * @param {*} SubtotalInfo(Object)        : {items- # of items, total- price of all items}
 */
function Subtotal({
  btnText1,
  btnText2,
  btnClickCallBack1,
  btnClickCallBack2,
  SubtotalInfo = null,
}) {
  return (
    <div className="productShow_subTotal">
      {SubtotalInfo && (
        <p className="subTotal__Info">
          {`Subtotal (${SubtotalInfo?.items} item${
            SubtotalInfo?.items > 1 ? "s" : ""
          }): $${SubtotalInfo?.total}`}{" "}
        </p>
      )}

      {btnText1 && (
        <button className="button1-color" onClick={btnClickCallBack1}>
          {btnText1}
        </button>
      )}
      {btnText2 && (
        <button className="button2-color" onClick={btnClickCallBack2}>
          {btnText2}
        </button>
      )}

      <div className="transcation">
        <span className="transaction__lockIcon">
          <svg viewBox="0 0 448 512" width="100" title="lock">
            <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
          </svg>
        </span>

        <span className="transcation__text">Secure Transcation</span>
      </div>

      <div className="giftOptions">
        <input type="checkbox" />
        <span>Add gift options</span>
      </div>
    </div>
  );
}

export default Subtotal;
