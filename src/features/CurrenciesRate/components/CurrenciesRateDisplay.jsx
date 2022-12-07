import React from "react";

import "features/CurrenciesRate/components/css/CurrenciesRateDisplay.css";

export const CurrenciesRateDisplay = ({
  rate,
  source,
  currencies,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  watchlisted,
}) => {
  if (!source && !currencies) return;

  const id = `${source}_${currencies}`;

  return (
    <div className="flex-display currencies-rate-display__container">
      <div> {`1 ${source} = ${rate} ${currencies}`}</div>
      <div>
        <button
          onClick={() =>
            watchlisted
              ? handleRemoveFromWatchlist(id)
              : handleAddToWatchlist(id, rate)
          }
        >
          <i
            className={` fa fa-star${watchlisted ? "" : "-o"}`}
            title={`${
              watchlisted ? "Remove from watchlist" : "Add to watchlist"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
