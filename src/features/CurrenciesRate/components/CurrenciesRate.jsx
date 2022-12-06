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

const DB_CURRENCIES_RATE = `${apiUrls.JSON_DB}currencies`;

export const CurrenciesRate = () => {
  const {
    currenciesRate,
    addCurrenciesRateToWishlist,
    addAllCurrenciesRateToWishlist,
    removeCurrenciesRateFromWishlist,
  } = useCurrenciesRate();
  const [currenciesSelected, setCurrenciesSelected] = useState({});

  console.log("CurrenciesRate: currenciesSelected = ", currenciesSelected);
  console.log("CurrenciesRate: currenciesRate = ", currenciesRate);

  const configCurrenciesHandler = async ({ source, currencies }) => {
    setCurrenciesSelected({
      id: generateIdFromSourceCurrencies(source, currencies),
      source,
      currencies,
      rate: "",
      wishlisted: false,
    });
  };

  const getCurrencyRate = async (id, source, currencies) => {
    console.log("triggered getCurrencyRate", source, currencies);
    if (isEmptyStr(source) && isEmptyStr(currencies)) {
      return;
    }
    // const { url, apikey } = apiUrls.CURRENCY_CONVERTER;

    try {
      console.log("fetching !!!!!!!!!!");
      // const rateKey = getSourceCurrenciesFromId(id).join("");
      // const response = await fetchData(
      //   `${url}source=${source}&currencies=${currencies}&apikey=${apikey}`
      // );
      // console.log("response = ", response);
      // const rate = await response.quotes[rateKey].toFixed(4);
      const rate = 86.12;
      console.log("source = ", source, "currencies = ", currencies, rate);
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

  //Fetching the wishlisted currencies rate while the initial load of the page.
  useEffect(() => {
    (async () => {
      try {
        const fecthedAllCurrencies = await fetchData(DB_CURRENCIES_RATE);
        if (fecthedAllCurrencies.length) {
          addAllCurrenciesRateToWishlist(fecthedAllCurrencies);
        }
      } catch (error) {
        console.log(
          "Error while fetching wishlisted currencies from the DB. Error = ",
          error
        );
      }
    })();
  }, [addAllCurrenciesRateToWishlist]);

  const wishlistCurrencyRate = async (id, rate) => {
    const wishlistedData = { id, rate, wishlisted: true };
    const isCurrencyExists = currenciesRate.find(
      (currency) => currency.id === id
    );
    await addCurrenciesRateToWishlist(wishlistedData);
    (await isCurrencyExists)
      ? updateData(`${DB_CURRENCIES_RATE}/${id}`, wishlistedData)
      : postData(DB_CURRENCIES_RATE, wishlistedData);
    setCurrenciesSelected({});
  };

  const unWishlistCurrencyRate = async (id) => {
    await removeCurrenciesRateFromWishlist(id);
    await deleteData(`${DB_CURRENCIES_RATE}/${id}`);
  };

  const refreshWishlitCurrencyRate = async () => {
    const updatedRates = [];
    await currenciesRate.forEach(async ({ id }) => {
      const [source, currencies] = getSourceCurrenciesFromId(id);
      console.log("refreshWishlitCurrencyRate , id = ", id, source, currencies);
      const rate = await getCurrencyRate(id, source, currencies);
      updatedRates.push({ id, rate, wishlisted: true });
    });
    console.log("updatedRates= ", updatedRates);
    addAllCurrenciesRateToWishlist(updatedRates);
  };

  return (
    <div className={"flex-centered-column currencies-rate__container"}>
      <div className="currencies-rate__non-wishlisted">
        <CurrenciesRateDisplay
          {...currenciesSelected}
          handleAddToWishlist={wishlistCurrencyRate}
        />
      </div>

      <div className="curriences-rate__form">
        <CurrenciesRateForm handleCurrenciesConfig={configCurrenciesHandler} />
      </div>

      <div className="currencies-rate__wishlisted">
        <div>
          {currenciesRate.length ? (
            <>
              <div className="flex-display wishlist__refresh">
                <h3>Watchlist</h3>
                <button
                  className="wishlist__refresh__btn"
                  type="button"
                  onClick={() => refreshWishlitCurrencyRate()}
                >
                  <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
              </div>
            </>
          ) : null}
        </div>
        <div className="wishlist__display">
          {currenciesRate.map(({ id, ...rest }) => {
            const [source, currencies] = getSourceCurrenciesFromId(id);
            const props = { source, currencies, ...rest };
            return (
              <CurrenciesRateDisplay
                {...props}
                handleAddToWishlist={wishlistCurrencyRate}
                handleRemoveFromWishlist={unWishlistCurrencyRate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
