import React from "react";

import "features/CurrenciesRate/components/css/CurrenciesRateDisplay.css";

export const CurrenciesRateDisplay = ({
  rate,
  source,
  currencies,
  handleAddToWishlist,
  handleRemoveFromWishlist,
  wishlisted,
}) => {
  if (!source && !currencies) return;

  const id = `${source}_${currencies}`;

  return (
    <div className="flex-display currencies-rate-display__container">
      <div> {`1 ${source} = ${rate} ${currencies}`}</div>
      <div>
        <button
          onClick={() =>
            wishlisted
              ? handleRemoveFromWishlist(id)
              : handleAddToWishlist(id, rate)
          }
        >
          <i className={` fa fa-star${wishlisted ? "" : "-o"}`} />
        </button>
      </div>
    </div>
  );
};
