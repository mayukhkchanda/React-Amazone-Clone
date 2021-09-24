import React from "react";
import "./css/Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <img
        className="banner__image"
        src={`${process.env.PUBLIC_URL}/assets/images/banner_image.jpg`}
        alt="amazon-banner"
      />
    </div>
  );
};

export default Banner;
