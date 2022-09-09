import React, { useRef, useCallback } from "react";

import { Appbar } from "components";
import { Routes } from "./Routes";
import { apiUrls, BG_IMAGE_SIZE } from "data/Constants";
import "./App.css";

function App() {
  const appRef = useRef();

  const changeBackground = useCallback((imageVariant) => {
    const imageUrl = `${apiUrls.IMAGE}?${imageVariant}/${BG_IMAGE_SIZE}`;
    appRef.current.style.backgroundImage = `url(${imageUrl})`;
  }, []);
  return (
    <div className="app-image" ref={appRef}>
      <Appbar appRef={appRef} changeBg={changeBackground} />
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
