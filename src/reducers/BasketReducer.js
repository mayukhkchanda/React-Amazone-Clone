import _ from "lodash";
import {
  ADD_ORDERS,
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
} from "../actions/type";
const INIT_STATE = {};

export const basketRedcucer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_PRODUCT_FROM_BASKET:
      return _.omit(state, [action.payload]);
    case ADD_ORDERS:
      return INIT_STATE;

    default:
      return state;
  }
};
