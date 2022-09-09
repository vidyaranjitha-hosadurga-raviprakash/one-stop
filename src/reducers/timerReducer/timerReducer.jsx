import { timerActions } from "reducers";
export const timerReducer = (timerState = [], action) => {
  const { type, payload } = action;
  console.log("timerReducer: type = ", type, "payload = ", payload);
  switch (type) {
    case timerActions.START_TIMER:
    case timerActions.STOP_TIMER: {
      return { ...timerState, isTimerExecuting: payload };
    }

    case timerActions.EXHAUSTED_TIMER: {
      return { ...timerState, isTimerExhausted: payload };
    }

    case timerActions.CONFIG_TIMER:
    case timerActions.RESET_TIMER: {
      console.log({ ...timerState, ...payload });
      return { ...timerState, ...payload };
    }

    default:
      return timerState;
  }
};
