import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import reducer from "./reducers";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider
    store={createStore(reducer, composeEnhancers(applyMiddleware(thunk)))}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
