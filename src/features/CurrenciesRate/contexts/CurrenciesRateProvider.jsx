import React, {
  useCallback,
  useReducer,
  useContext,
  createContext,
} from "react";

import {
  currenciesRateReducer,
  currenciesRateActions,
} from "features/CurrenciesRate";

const CurrenciesRateContext = createContext();

const CurrenciesRateProvider = ({ children }) => {
  const [currenciesRate, currenciesRateDispatch] = useReducer(
    currenciesRateReducer,
    []
  );

  const addAllCurrenciesRateToWatchlist = useCallback((payload) => {
    console.log("addAllCurrenciesRateToWatchlist: payload", payload);
    currenciesRateDispatch({
      type: currenciesRateActions.ADD_ALL_CURRENCIES_RATE_TO_WATCHLIST,
      payload,
    });
  }, []);
  const addCurrenciesRateToWatchlist = (payload) => {
    console.log("addCurrenciesRateToWatchlist: payload", payload);
    currenciesRateDispatch({
      type: currenciesRateActions.ADD_CURRENCIES_RATE_TO_WATCHLIST,
      payload,
    });
  };

  const removeCurrenciesRateFromWatchlist = (id) => {
    currenciesRateDispatch({
      type: currenciesRateActions.REMOVE_CURRENCIES_RATE_TO_WATCHLIST,
      payload: { id },
    });
  };
  const options = {
    currenciesRate,
    addCurrenciesRateToWatchlist,
    addAllCurrenciesRateToWatchlist,
    removeCurrenciesRateFromWatchlist,
  };
  return (
    <CurrenciesRateContext.Provider value={{ ...options }}>
      {children}
    </CurrenciesRateContext.Provider>
  );
};

const useCurrenciesRate = () => useContext(CurrenciesRateContext);

export { CurrenciesRateProvider, useCurrenciesRate };
