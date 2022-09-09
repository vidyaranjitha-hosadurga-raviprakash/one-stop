import { Home, Timer } from "pages";
import { Routes as RoutesContainer, Route } from "react-router-dom";
import { QuotesProvider } from "contexts";
import { routesConstant } from "data/Constants";
import React from "react";
export const Routes = () => {
  return (
    <>
      <RoutesContainer>
        <Route
          path={routesConstant.HOME_PAGE}
          element={
            <QuotesProvider>
              <Home />
            </QuotesProvider>
          }
        />
        <Route path={routesConstant.TIMER_PAGE} element={<Timer />} />

        {/* <Route
          path={routesConstant.MULTI_CLOCKS_PAGE}
          element={<MultiClocks />}
        />
        <Route
          path={routesConstant.CURRENCY_CONVERTER_PAGE}
          element={<CurrencyConverter />}
        /> */}
      </RoutesContainer>
    </>
  );
};
