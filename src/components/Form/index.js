import React from "react";
import { Formik } from "formik";
import "./css/index.css";

import { useLocation } from "react-router-dom";
import Feild from "./Feild";

const Form = ({
  formHeader,
  SubmitBtnText,
  linkBtnText,
  onFormSubmit,
  onFormLinkClick,
  authErrs,
}) => {
  const location = useLocation();

  const handleFormLinkClick = (event) => {
    event.preventDefault();
    onFormLinkClick();
  };

  const handleFormSubmit = (values, setSubmitting) => {
    onFormSubmit(values, setSubmitting);
    // setSubmitting(false);
  };

  console.log(authErrs);

  const renderAuthErrs = () => {
    return <p className="auth__errors">{authErrs}</p>;
  };

  /**
   * @params all params listed here must be passed to the function
   * @returns the rendered form UI.
   */
  const renderFormUI = (
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  ) => {
    return (
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__header">{formHeader}</h1>

        {location && location?.pathname === "/signup" && (
          <Feild
            displayName="Username"
            attrName="username"
            feildType="text"
            feildValue={values.username}
            feildError={errors.username}
            feildTouched={touched.username}
            handleChange={handleChange}
            handleBlur={handleBlur}
            renderError={
              errors.username && errors.username !== "" && touched.username
            }
          />
        )}

        <Feild
          displayName="E-mail"
          attrName="email"
          feildType="email"
          feildValue={values.email}
          feildError={errors.email}
          feildTouched={touched.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          renderError={errors.email && errors.email !== "" && touched.email}
        />

        <Feild
          displayName="Password"
          attrName="password"
          feildType="password"
          feildValue={values.password}
          feildError={errors.password}
          feildTouched={touched.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          renderError={
            errors.password && errors.password !== "" && touched.password
          }
        />

        {authErrs && renderAuthErrs()}

        <button
          className="form__Btn submit"
          type="submit"
          disabled={isSubmitting}
        >
          {SubmitBtnText}
        </button>

        <p className="form__policy">
          By signing-in you agree to the AMAZON-CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          className="form__Btn link"
          onClick={(e) => handleFormLinkClick(e)}
        >
          {linkBtnText}
        </button>
      </form>
    );
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 6 || values.password.length > 50) {
          errors.password = "Password must be between 6 to 50 characters";
        }

        /** username errors used only in sign-up page  */
        if (location?.pathname === "/signup" && !values.username) {
          errors.username = "Username is required";
        } else if (
          (location?.pathname === "/signup" && values.username.length < 6) ||
          values.username.length > 10
        ) {
          errors.username = "Username must be between 6 to 10 characters";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleFormSubmit(values, setSubmitting);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) =>
        renderFormUI(
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        )
      }
    </Formik>
  );
};

export default Form;
