import React, { useState } from "react";
import { Navbar } from "components/";
import { useClock } from "contexts";
import "components/Appbar/appbar.css";
import { NAVBAR_BG_IMAGE_MAPPING } from "data/Constants";
export const Appbar = ({ changeBg }) => {
  const [activeNav, setActiveNav] = useState(0);

  const activeNavHandler = (index) => {
    changeBg(NAVBAR_BG_IMAGE_MAPPING[index]);
    setActiveNav(index);
  };

  const {
    clock: { time },
  } = useClock();

  return (
    <div className="appbar-container">
      <Navbar activeNav={activeNav} activeNavHandler={activeNavHandler} />
      {/* Weather widget only in home page and clock in rest of the page */}
      <div className="appbar-widget-wrapper">{activeNav === 0 ? null : time}</div>
      {/* <Weather /> */}
    </div>
  );
};
