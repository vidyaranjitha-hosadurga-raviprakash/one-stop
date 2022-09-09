import React from "react";

import { useTimer } from "contexts";
import { ConfigTimerForm } from "pages/Timer";
import { CountdownTimer } from "components";
import { convertHMS } from "utils/commonOperations";

import "pages/Timer/timer.css";

const COLORS = ["#004777", "#F7B801", "#A30000", "#b71c1c"];

export const Timer = () => {
  const {
    timer,
    configTimer,
    startTimer,
    stopTimer,
    resetTimer,
    countDownRemainingTime,
  } = useTimer();
  const { timerKey, config, isTimerExecuting, isTimerExhausted } = timer;

  const timerControls = [
    {
      value: <i className="fa fa-play" />,
      clickHandler: () => startTimer(),
      disabled: isTimerExecuting || isTimerExhausted,
    },
    {
      value: <i className="fa fa-pause" />,
      clickHandler: () => stopTimer(),
      disabled: !isTimerExecuting,
      ref: null,
    },
    {
      value: <i className="fa fa-undo" />,
      clickHandler: () => resetTimer(),
      disabled: false,
    },
  ];

  const timerChildren = (remainingTime) => {
    const { hours, minutes, seconds } = convertHMS(remainingTime);
    return (
      <div className="flex-centered-column">
        <span>{`${hours}: ${minutes}: ${seconds}`}</span>
        <span className="danger">{remainingTime === 0 && "Times Up!"}</span>
      </div>
    );
  };

  const handleTimerConfig = (timerValue) => configTimer(timerValue);

  return (
    <div className="container flex-centered-column">
      <div className="flex-centered-column timer-container">
        <div className="timer-config-wrapper">
          <ConfigTimerForm
            handleTimerConfig={handleTimerConfig}
            isTimerExecuting={isTimerExecuting}
          />
        </div>
        <div className="timer-display-wrapper">
          <div className="timer-progress">
            <CountdownTimer
              timerKey={timerKey}
              isPlaying={isTimerExecuting}
              duration={config[0].value}
              initialRemainingTime={countDownRemainingTime}
              colors={COLORS}
              isDurationInMinute={false}
              rotation={"counterclockwise"}
              children={timerChildren}
            />
          </div>

          <div className="timer-controls ">
            {timerControls.map(({ value, clickHandler, disabled }, index) => {
              return (
                <button
                  key={index}
                  className="timer-control-btn"
                  onClick={clickHandler}
                  disabled={disabled}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
