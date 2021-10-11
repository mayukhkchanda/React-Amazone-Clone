import { useState, useEffect } from "react";

export const useWindowScroll = () => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return isVisible;
};
