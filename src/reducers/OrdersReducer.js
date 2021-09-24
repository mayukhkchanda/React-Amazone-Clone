import { ADD_ORDERS } from "../actions/type";

const INIT_STATE = {};

export const ordersReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_ORDERS:
      return { ...state, [action.payload.order_id]: action.payload };

    default:
      return state;
  }
};
