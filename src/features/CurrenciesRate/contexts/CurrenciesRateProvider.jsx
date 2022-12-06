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

  const addAllCurrenciesRateToWishlist = useCallback((payload) => {
    console.log("addAllCurrenciesRateToWishlist: payload", payload);
    currenciesRateDispatch({
      type: currenciesRateActions.ADD_ALL_CURRENCIES_RATE_TO_WISHLIST,
      payload,
    });
  }, []);
  const addCurrenciesRateToWishlist = (payload) => {
    console.log("addCurrenciesRateToWishlist: payload", payload);
    currenciesRateDispatch({
      type: currenciesRateActions.ADD_CURRENCIES_RATE_TO_WISHLIST,
      payload,
    });
  };

  const removeCurrenciesRateFromWishlist = (id) => {
    currenciesRateDispatch({
      type: currenciesRateActions.REMOVE_CURRENCIES_RATE_TO_WISHLIST,
      payload: { id },
    });
  };
  const options = {
    currenciesRate,
    addCurrenciesRateToWishlist,
    addAllCurrenciesRateToWishlist,
    removeCurrenciesRateFromWishlist,
  };
  return (
    <CurrenciesRateContext.Provider value={{ ...options }}>
      {children}
    </CurrenciesRateContext.Provider>
  );
};

const useCurrenciesRate = () => useContext(CurrenciesRateContext);

export { CurrenciesRateProvider, useCurrenciesRate };
