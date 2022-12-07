import React, { useEffect, useState } from "react";

import {
  CurrenciesRateForm,
  CurrenciesRateDisplay,
} from "features/CurrenciesRate/components";
import { useCurrenciesRate } from "features/";

// import { fetchData } from "libs/fetchData";
import { apiUrls } from "data/Constants";

import "features/CurrenciesRate/components/css/CurrenciesRate.css";
import { fetchData, postData, updateData, deleteData } from "libs/axiosOps";
import { isEmptyStr } from "utils/commonOperations";
import {
  generateIdFromSourceCurrencies,
  getSourceCurrenciesFromId,
} from "features/CurrenciesRate/helpers/commonOperations";
import { toast } from "react-toastify";

const DB_CURRENCIES_RATE = `${apiUrls.JSON_DB}currencies`;

export const CurrenciesRate = () => {
  const {
    currenciesRate,
    addCurrenciesRateToWatchlist,
    addAllCurrenciesRateToWatchlist,
    removeCurrenciesRateFromWatchlist,
  } = useCurrenciesRate();
  const [currenciesSelected, setCurrenciesSelected] = useState({});

  // console.log("CurrenciesRate: currenciesSelected = ", currenciesSelected);
  // console.log("CurrenciesRate: currenciesRate = ", currenciesRate);

  const configCurrenciesHandler = async ({ source, currencies }) => {
    setCurrenciesSelected({
      id: generateIdFromSourceCurrencies(source, currencies),
      source,
      currencies,
      rate: "",
      watchlisted: false,
    });
  };

  const getCurrencyRate = async (id, source, currencies) => {
    if (isEmptyStr(source) && isEmptyStr(currencies)) {
      return;
    }
    const { url, apikey } = apiUrls.CURRENCY_CONVERTER;

    try {
      console.log("fetching !!!!!!!!!!");
      // const rateKey = getSourceCurrenciesFromId(id).join("");
      // const response = await fetchData(
      //   `${url}source=${source}&currencies=${currencies}&apikey=${apikey}`
      // );
      // console.log("response = ", response);
      // const rate = await response.quotes[rateKey].toFixed(2);
      // console.log("source = ", source, "currencies = ", currencies, rate);
      const rate = 19.19;
      // localStorage.setItem("CURRENCY", euroInr, 86400 * 1000);
      return rate;
    } catch {}
  };

  useEffect(() => {
    (async () => {
      const { id, source, currencies } = currenciesSelected;
      const rate = await getCurrencyRate(id, source, currencies);
      setCurrenciesSelected((preVal) => ({ ...preVal, rate }));
    })();
  }, [currenciesSelected.source, currenciesSelected.currencies]);

  //Fetching the watchlisted currencies rate while the initial load of the page.
  useEffect(() => {
    (async () => {
      try {
        const fecthedAllCurrencies = await fetchData(DB_CURRENCIES_RATE);
        if (fecthedAllCurrencies.length) {
          addAllCurrenciesRateToWatchlist(fecthedAllCurrencies);
        }
      } catch (error) {
        console.log(
          "Error while fetching watchlisted currencies from the DB. Error = ",
          error
        );
      }
    })();
  }, [addAllCurrenciesRateToWatchlist]);

  const watchlistCurrencyRate = async (id, rate) => {
    const watchlistedData = { id, rate, watchlisted: true };
    const isCurrencyExists = currenciesRate.find(
      (currency) => currency.id === id
    );
    await addCurrenciesRateToWatchlist(watchlistedData);
    try {
      (await isCurrencyExists)
        ? updateData(`${DB_CURRENCIES_RATE}/${id}`, watchlistedData)
        : postData(DB_CURRENCIES_RATE, watchlistedData);
    } catch (error) {
      toast.error("Failed to add to watchlist");
    }
    setCurrenciesSelected({});
  };

  const unWatchlistCurrencyRate = async (id) => {
    await removeCurrenciesRateFromWatchlist(id);
    try {
      await deleteData(`${DB_CURRENCIES_RATE}/${id}`);
    } catch (error) {
      toast.error("Failed to remove from the watchlist");
    }
  };

  const refreshWatchlistCurrencyRate = async () => {
    const updatedRates = [];
    const fecthedAllCurrencies = await fetchData(DB_CURRENCIES_RATE);

    await Promise.all(
      fecthedAllCurrencies.map(async ({ id }) => {
        try {
          const [source, currencies] = getSourceCurrenciesFromId(id);
          const rate = await getCurrencyRate(id, source, currencies);
          updatedRates.push({ id, rate, watchlisted: true });
        } catch (error) {
          toast.error("Failed to refresh the watchlist");
          console.log(
            "Error while fetching watchlisted currencies from the DB. Error = ",
            error
          );
        }
      })
    );

    if (updatedRates.length) {
      addAllCurrenciesRateToWatchlist(updatedRates);
      // Updating to the DB
      try {
        updatedRates.forEach((updatedRate) => {
          updateData(`${DB_CURRENCIES_RATE}/${updatedRate.id}`, updatedRate);
        });
      } catch (error) {
        toast.error("Failed to update DB");
      }
    }
  };

  return (
    <div className={"currencies-rate__container"}>
      <div className="flex-centered-column">
        <div className="flex-centered-column currencies-rate__non-watchlisted">
          <CurrenciesRateDisplay
            {...currenciesSelected}
            handleAddToWatchlist={watchlistCurrencyRate}
          />
        </div>

        <div className="curriences-rate__form">
          <CurrenciesRateForm
            handleCurrenciesConfig={configCurrenciesHandler}
          />
        </div>

        {Boolean(currenciesRate.length) && (
          <div className="currencies-rate__watchlisted">
            <div className="watchlist__header">
              {currenciesRate.length ? (
                <>
                  <div className="flex-display watchlist__refresh">
                    <h3>Watchlist</h3>
                    <button
                      className="watchlist__refresh__btn"
                      type="button"
                      onClick={() => refreshWatchlistCurrencyRate()}
                      title="Refresh watchlist"
                    >
                      <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                  </div>
                </>
              ) : null}
              <hr></hr>
            </div>
            <div className="flex-centered-column  watchlist__content">
              {currenciesRate.map(({ id, ...rest }) => {
                const [source, currencies] = getSourceCurrenciesFromId(id);
                const props = { source, currencies, ...rest };
                return (
                  <CurrenciesRateDisplay
                    {...props}
                    handleAddToWatchlist={watchlistCurrencyRate}
                    handleRemoveFromWatchlist={unWatchlistCurrencyRate}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
