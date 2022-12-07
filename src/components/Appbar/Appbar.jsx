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
    <div className="flex-display appbar__container">
      <Navbar activeNav={activeNav} activeNavHandler={activeNavHandler} />

      {/* Clock widget in all pages except the home page */}
      <div className="appbar-clock-widget__wrapper">
        {activeNav !== 0 && time}
      </div>

      {/* TODO : Add weather widget*/}
      {/* <Weather /> */}
    </div>
  );
};
