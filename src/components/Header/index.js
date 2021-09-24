import React from "react";
import Basket from "./Basket";
import Navlink from "./Navlink";
import SearchBar from "./SearchBar";
import "./css/index.css";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

import history from "../../history";
import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";

const Header = ({ user_meta, is_signed_in }) => {
  let location = useLocation();

  if (
    location &&
    (location?.pathname === "/signin" || location?.pathname === "/signup")
  ) {
    return null;
  }

  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const onBtnClick = () => {
    if (is_signed_in) {
      signOutUser();
    } else {
      history.push("/signin");
    }
  };

  const renderAuthBtnText = () => {
    if (is_signed_in) {
      return `Hello ${user_meta.displayName}`;
    } else {
      return "Hello Guest";
    }
  };

  const navToOrders = () => {
    history.push("/orders");
  };

  return (
    <div className="header">
      <div className="header--view">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/amazon_logo_header.png`}
            alt="amazon-logo"
            className="header__logo"
          />
        </Link>

        <SearchBar />

        <div className="header__nav">
          <Navlink
            text1={renderAuthBtnText()}
            text2={is_signed_in ? "Sign Out" : "Sign In"}
            isMobileView
            onBtnClick={onBtnClick}
          />
          <Navlink onBtnClick={navToOrders} text1="Returns" text2="& Orders" />
          <Navlink text1="Your" text2="Prime" />
          <Basket />
        </div>
      </div>
      <SearchBar isMobileView />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user_meta: state.user_meta, is_signed_in: state.is_signed_in };
};

export default connect(mapStateToProps, {})(Header);
