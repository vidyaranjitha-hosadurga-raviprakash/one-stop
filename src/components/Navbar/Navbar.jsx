import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navOptions, NAVBAR_BG_IMAGE_MAPPING } from "data/Constants";
import { isActiveEle } from "utils/commonOperations";
import "components/Navbar/navbar.css";

export const Navbar = ({ changeBg }) => {
  const [activeNav, setActiveNav] = useState(0);

  const onClickNavHandler = (index) => {
    changeBg(NAVBAR_BG_IMAGE_MAPPING[index]);
    setActiveNav(index);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-links">
          {navOptions.map(({ name, to }, index) => (
            <Link
              key={index}
              to={to}
              onClick={() => onClickNavHandler(index)}
              className={`nav-link ${isActiveEle(activeNav, index)}`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
