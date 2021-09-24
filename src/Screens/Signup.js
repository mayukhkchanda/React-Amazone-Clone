import React, { useState } from "react";
import "./css/Signup.css";
import Form from "../components/Form";

import history from "../history";

import { auth } from "../firebase.js";
import { ShortError } from "../utils/GetShortError";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [authErrs, setAuthErrs] = useState("");

  const createNewUser = ({ username, email, password }, setSubmitting) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          updateProfile(auth.currentUser, { displayName: username }).then(
            () => {
              setSubmitting(false);
              history.push(`/`);
            }
          );
        }
      })
      .catch((error) => {
        setAuthErrs(ShortError(error));
        // console.log(error.message);
        setSubmitting(false);
      });
  };

  const navigateToSignin = () => {
    history.push("/signin");
  };

  return (
    <div className="signup">
      <Link to="/">
        <div className="signup__logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Amazon_logo.svg`}
            alt="amazon logo"
          />
        </div>
      </Link>
      <Form
        formHeader="Sign Up"
        SubmitBtnText="Create your Account"
        linkBtnText="Sign In"
        onFormSubmit={createNewUser}
        onFormLinkClick={navigateToSignin}
        authErrs={authErrs}
      />
    </div>
  );
};

export default Signup;
