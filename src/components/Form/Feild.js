import React from "react";
import "./css/Feild.css";

/**
 * @param  displayName -> display name
 * @param  attrName ->  name provided to the name attribute(must be same as the value name in the form's initial values)
 * @returns the feild UI
 */

const Feild = ({
  displayName,
  attrName,
  feildType,
  feildValue,
  feildError,
  feildTouched,
  handleChange,
  handleBlur,
  renderError,
}) => {
  return (
    <div className="form__feild">
      <div className="feild__name">{displayName}</div>
      <input
        className={`feild__input ${renderError ? "error" : ""}`}
        type={feildType}
        name={attrName}
        onChange={handleChange}
        onBlur={handleBlur}
        value={feildValue}
      />
      {renderError && (
        <p className="feild__error">
          {feildError && feildTouched && feildError}
        </p>
      )}
    </div>
  );
};

export default Feild;
