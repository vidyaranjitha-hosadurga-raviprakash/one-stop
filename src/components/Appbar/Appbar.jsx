import React from "react";
import { Navbar, Weather } from "components/";

import "components/Appbar/appbar.css";
export const Appbar = ({ changeBg }) => {
  return (
    <div className="appbar-container">
      <Navbar changeBg={changeBg} />
      <Weather />
    </div>
  );
};
