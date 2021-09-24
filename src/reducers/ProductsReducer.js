import { GET_PRODUCTS, GET_PRODUCT } from "../actions/type";
import _ from "lodash";

const INIT = {};

export const productReducer = (state = INIT, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return _.mapKeys(action.payload, "id");

    case GET_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
