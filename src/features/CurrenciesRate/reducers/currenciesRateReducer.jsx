import { currenciesRateActions } from "features/CurrenciesRate/";

export const currenciesRateReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case currenciesRateActions.ADD_ALL_CURRENCIES_RATE_TO_WATCHLIST: {
      return [...payload];
    }
    case currenciesRateActions.ADD_CURRENCIES_RATE_TO_WATCHLIST: {
      const nonDuplicatesCurrencies = state.filter(
        (ele) => ele.id !== payload.id
      );

      return [...nonDuplicatesCurrencies, payload];
    }
    case currenciesRateActions.REMOVE_CURRENCIES_RATE_TO_WATCHLIST: {
      console.log(
        " remove , result = ",
        state.filter((currency) => currency.id !== payload.id)
      );
      return state.filter((currency) => currency.id !== payload.id);
    }
    default:
      return state;
  }
};
