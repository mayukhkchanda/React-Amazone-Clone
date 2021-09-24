import React from "react";

const Stars = ({ numStars }) => {
  return (
    <div className="stars">
      {Array(numStars)
        .fill()
        .map((_) => "⭐")}
    </div>
  );
};

export default Stars;
