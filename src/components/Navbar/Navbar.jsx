import React from "react";
import { Link } from "react-router-dom";
import { navOptions } from "data/Constants";
import { isActiveEle } from "utils/commonOperations";
import "components/Navbar/navbar.css";

export const Navbar = ({ activeNav, activeNavHandler }) => {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-links-wrapper">
          {navOptions.map(({ name, to }, index) => (
            <Link
              key={index}
              to={to}
              onClick={() => activeNavHandler(index)}
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
