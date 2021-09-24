import React, { useState } from "react";
import "./css/Signin.css";
import Form from "../components/Form";

import history from "../history";

import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { ShortError } from "../utils/GetShortError";

import { Link, useParams } from "react-router-dom";

const Signin = () => {
  const [authErrs, setAuthErrs] = useState("");

  const { next } = useParams();

  const authenticateUser = ({ email, password }, setSubmitting) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          if (next) {
            history.push(`/${next}`);
          } else {
            history.push(`/`);
          }
        }
      })
      .catch((error) => {
        setAuthErrs(ShortError(error));
        setSubmitting(false);
      });
  };

  const navigateToSignup = () => {
    history.push("/signup");
  };

  return (
    <div className="signin">
      <Link to="/">
        <div className="signin__logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Amazon_logo.svg`}
            alt="amazon logo"
          />
        </div>
      </Link>
      <Form
        formHeader="Sign In"
        SubmitBtnText="Sign In"
        linkBtnText="Create your Account"
        onFormSubmit={authenticateUser}
        onFormLinkClick={navigateToSignup}
        authErrs={authErrs}
      />
    </div>
  );
};

export default Signin;
