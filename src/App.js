import React, { useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Appbar } from "components";
import { Routes } from "./Routes";
import { apiUrls, BG_IMAGE_SIZE, routesConstant } from "data/Constants";
import "./App.css";

function App() {
  const appRef = useRef();

  // To resolve the eslint useEffect's empty dependency array.
  const navigateRef = useRef(() => {});
  navigateRef.current = useNavigate();

  const changeBackground = useCallback((imageVariant) => {
    const imageUrl = `${apiUrls.IMAGE}?${imageVariant}/${BG_IMAGE_SIZE}`;
    appRef.current.style.backgroundImage = `url(${imageUrl})`;
  }, []);

  // On loading of app, navigating to home page.
  useEffect(() => {
    navigateRef.current(routesConstant.TIMER_PAGE);
  }, []);

  return (
    <div className="app-image" ref={appRef}>
      <ToastContainer />
      <Appbar appRef={appRef} changeBg={changeBackground} />
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
