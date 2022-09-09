import React from "react";

import { useClock, useQuotes } from "contexts/";
import "pages/Home/home.css";

export const Home = () => {
  const {
    clock: { date, time, greet },
  } = useClock();

  const {
    quotes: { text, author },
  } = useQuotes();

  return (
    <div className="home-container container">
      <div className="flex-centered-column home-clock-wrapper">
        <div className="clock-time">
          <h1>{time}</h1>
        </div>
        <div className="clock-greet">{greet}</div>
        <div className="clock-date">{date}</div>
        <div></div>
      </div>

      <div className="flex-centered-column home-quotes-wrapper">
        <div className="quotes-text">"{text}"</div>
        <div className="quotes-author">
          By {`${author?.length ? author : "Unknown"}`}
        </div>
      </div>
    </div>
  );
};
