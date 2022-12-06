import React from "react";
import { CurrenciesRate } from "features";

import "pages/Currencies/Currencies.css";
export const Currencies = () => {
  return (
    <div className="container">
      <div className="currencies__container">
        <CurrenciesRate />
      </div>
    </div>
  );
};
