import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { ClockProvider, TimerProvider } from "contexts";

import "./index.css";
import App from "./App";
import { CurrenciesRateProvider } from "features";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrenciesRateProvider>
      <ClockProvider>
        <TimerProvider>
          <Router>
            <App />
          </Router>
        </TimerProvider>
      </ClockProvider>
    </CurrenciesRateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
