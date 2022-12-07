import React from "react";
import { Routes as RoutesContainer, Route } from "react-router-dom";

import { Home, Timer, Currencies } from "pages";
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
      <Route path={routesConstant.CURRENCIES_PAGE} element={<Currencies />} />
    </RoutesContainer>
  );
};
