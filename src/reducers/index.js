import { productReducer } from "./ProductsReducer";
import { basketRedcucer } from "./BasketReducer";
import { userMetaReducer } from "./UserMetaReducer";
import { authStateReducer } from "./AuthStateReducer";
import { ordersReducer } from "./OrdersReducer";

import { combineReducers } from "redux";
const rootReducer = combineReducers({
  products: productReducer,
  basket: basketRedcucer,
  orders: ordersReducer,
  user_meta: userMetaReducer,
  is_signed_in: authStateReducer,
});

export default rootReducer;
