import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useRef,
  useEffect,
} from "react";

import { timerReducer, timerActions } from "reducers";

import {
  convertMinuteToSec,
  getTimeInSeconds,
  generateRandomNumber,
} from "utils/commonOperations";

const DEFAULT_TIMER_VALUE = convertMinuteToSec(25);
const TimerContext = createContext();

const timerInitialState = {
  timerKey: 0,
  isTimerExhausted: false,
  isTimerExecuting: false,
  config: [
    {
      value: DEFAULT_TIMER_VALUE,
    },
  ],
};

const TimerProvider = ({ children }) => {
  const intervalRef = useRef();
  const [timer, timerDispatch] = useReducer(timerReducer, timerInitialState);
  const [countDownRemainingTime, setCountDownRemainingTime] = useState(
    timer.config[0].value
  );
  // console.log("countDownRemainingTime = ", countDownRemainingTime);

  // Running the timer.
  useEffect(() => {
    if (timer.isTimerExecuting) {
      intervalRef.current = setInterval(() => {
        setCountDownRemainingTime((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const configTimer = (timerValue) => {
    const { hours, minutes, seconds } = timerValue;
    const timerInSeconds = getTimeInSeconds(hours, minutes, seconds);
    if (timerInSeconds <= 0) {
      return;
    }
    const payload = {
      timerKey: timer.timerKey + generateRandomNumber(),
      config: [{ value: timerInSeconds }],
      isTimerExhausted: false,
    };
    setCountDownRemainingTime(timerInSeconds);
    timerDispatch({ type: timerActions.CONFIG_TIMER, payload: payload });
  };

  const startTimer = () => {
    timerDispatch({ type: timerActions.START_TIMER, payload: true });
  };

  const stopTimer = () => {
    timerDispatch({ type: timerActions.STOP_TIMER, payload: false });
  };

  const resetTimer = () => {
    setCountDownRemainingTime(DEFAULT_TIMER_VALUE);
    timerDispatch({
      type: timerActions.RESET_TIMER,
      payload: {
        timerKey: timer.timerKey + generateRandomNumber(),
        isTimerExecuting: false,
        isTimerExhausted: false,
        config: [{ value: DEFAULT_TIMER_VALUE }],
      },
    });
  };

  const exhaustedTimer = () => {
    timerDispatch({
      type: timerActions.EXHAUSTED_TIMER,
      payload: true,
    });
  };

  // Monitoring the timer for the completion.
  useEffect(() => {
    if (countDownRemainingTime <= 0) {
      exhaustedTimer();
      stopTimer();
    }
  }, [countDownRemainingTime]);

  return (
    <TimerContext.Provider
      value={{
        timer,
        configTimer,
        startTimer,
        stopTimer,
        resetTimer,
        countDownRemainingTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);
export { TimerProvider, useTimer };
