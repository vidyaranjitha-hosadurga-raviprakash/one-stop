import React from "react";
import { Routes as RoutesContainer, Route } from "react-router-dom";

import { Home, Timer } from "pages";
import { QuotesProvider } from "contexts";
import { routesConstant } from "data/Constants";

export const Routes = () => {
  return (
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
  );
};
