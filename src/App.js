import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Screens/Homepage";
import Checkout from "./Screens/Checkout";
import Payment from "./Screens/Payment";
import Signin from "./Screens/Signin";
import Orders from "./Screens/Orders";
import Signup from "./Screens/Signup";
import ProductShow from "./Screens/ProductShow";
import OrderConfirmed from "./Screens/OrderConfirmed";

import history from "./history";
import { Router, Route, Switch, Link } from "react-router-dom";

import { signInUser, signOutUser } from "./actions";
import { connect } from "react-redux";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = ({ user_meta, signInUser, signOutUser, is_signed_in }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        /**Signed In */
        signInUser(user, "/");
      } else {
        /**Not Signed In */
        signOutUser();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/payments" component={Payment} />
          <Route exact path="/order/confirmed" component={OrderConfirmed} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/signin/:next" component={Signin} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/product/:id" component={ProductShow} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user_meta: state.user_meta, is_signed_in: state.is_signed_in };
};

export default connect(mapStateToProps, { signInUser, signOutUser })(App);
