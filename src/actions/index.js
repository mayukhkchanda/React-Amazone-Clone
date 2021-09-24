import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT_TO_BASKET,
  ADD_ORDERS,
  REMOVE_PRODUCT_FROM_BASKET,
  SIGNIN,
  SIGNOUT,
} from "./type";
import { storeApi } from "../apis/StoreApi";
import history from "../history";

/**
 * Used Clousers for creating this function as getRandNumSeq is only used by fetcheProducts. Refer link https://stackoverflow.com/a/10204880
 * Fisher-Yates algorithm for generating random unique number sequences of number from 1 to n. Refer link https://stackoverflow.com/a/196065
 */
export const fetchProducts = (function () {
  // number of numbers we want
  const getRandNumSeq = (limit) => {
    const randSeq = Array(limit)
      .fill()
      .map((_, index) => {
        return index;
      });

    for (let i = 0; i < limit; i++) {
      let r = i + Math.ceil(Math.random() * (limit - i)) - 1;
      let temp = randSeq[i];
      randSeq[i] = randSeq[r];
      randSeq[r] = temp;
    }

    return randSeq.slice(0, 9);
  };

  return () => async (dispatch, getState) => {
    const cacheProducts = getState().products;

    let products;

    if (Object.values(cacheProducts).length === 0) {
      const data = await storeApi
        .get("/products")
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.error(err));

      const randNumSeq = getRandNumSeq(data.length);

      products = randNumSeq.map((randomIdx) => data[randomIdx]);
    } else {
      products = cacheProducts;
    }
    dispatch({
      type: GET_PRODUCTS,
      payload: products,
    });
  };
})();

/** Legacy code--> Fetch all products(limit = 10) */
// export const fetchProducts =  () => async (dispatch) => {
//   const products = await storeApi
//     .get("/products?limit=10")
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => console.error(err));

//   dispatch({
//     type: GET_PRODUCTS,
//     payload: products,
//   });
// };

/** Fetch a single product */
export const fetchProduct = (productId) => async (dispatch) => {
  const product = await storeApi
    .get(`/products/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));

  dispatch({
    type: GET_PRODUCT,
    payload: product,
  });
};

/** Add product to basket */
export const addProductToBasket = (product, route) => (dispatch, getState) => {
  const basket = getState().basket;

  /**if the product was already added to the basket, increase it's count */
  if (basket[product.id]) {
    product.quantity = basket[product.id].quantity + 1;
  } else {
    /**if the product was not added to the basket then make it's quantity as 1 */
    product.quantity = 1;
  }

  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    payload: product,
  });

  if (route) history.push(`/${route}`);
};

/** Remove product from basket completly */
export const removeProductFromBasket = (productId) => {
  return {
    type: REMOVE_PRODUCT_FROM_BASKET,
    payload: productId,
  };
};

/** Decrease the product quantity in the basket */
export const decreaseProdQtyInBasket = (product) => (dispatch, getState) => {
  const basket = getState().basket;

  if (basket[product.id]) {
    // get the product quantity
    let productQty = basket[product.id].quantity - 1;

    if (productQty <= 0) {
      dispatch({
        type: REMOVE_PRODUCT_FROM_BASKET,
        payload: product.id,
      });
    } else {
      product.quantity = productQty;
      dispatch({
        type: ADD_PRODUCT_TO_BASKET,
        payload: product,
      });
    }
  }
};

/** Add orders from basket to order state */
export const addOrders = (total) => (dispatch, getState) => {
  const basket_products = Object.values(getState().basket); // get basket products

  // order number to be fetched if uploading to firebase
  const order_number = Object.values(getState().orders).length + 1;

  const now = new Date();

  const order_meta = {
    products: [...basket_products], // add them to a list
    order_time:
      now.getDate() +
      " " +
      now.toLocaleString("default", { month: "long" }) +
      " " +
      now.getFullYear(),
    order_amount: total,
    order_id: order_number, // to be fetched after uploading to db
  };

  dispatch({
    type: ADD_ORDERS,
    payload: order_meta,
  });

  history.push("/order/confirmed");
};

/** Sign in a user */
export const signInUser = (user) => (dispatch) => {
  dispatch({
    type: SIGNIN,
    payload: user,
  });
};

/** Sign out a user */
export const signOutUser = () => {
  return {
    type: SIGNOUT,
    payload: null,
  };
};
