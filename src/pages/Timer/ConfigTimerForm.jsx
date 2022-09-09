import React, { useState } from "react";

const DEFAULT_TIMER_VALUE = {
  hours: "",
  minutes: "",
  seconds: "",
};
export const ConfigTimerForm = ({ handleTimerConfig, isTimerExecuting }) => {
  const [timerInput, setTimerInput] = useState(DEFAULT_TIMER_VALUE);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTimerConfig(timerInput);
    setTimerInput(DEFAULT_TIMER_VALUE);
  };

  const timerInputOptions = [
    {
      name: "hours",
    },
    {
      name: "minutes",
    },
    {
      name: "seconds",
    },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-centered config-timer-form">
        {timerInputOptions.map(({ name }, index) => {
          return (
            <input
              key={index}
              type="number"
              value={timerInput[name]}
              onChange={(e) =>
                setTimerInput({
                  ...timerInput,
                  [name]: parseInt(e.target.value),
                })
              }
              required
              className="input-box"
              placeholder={name}
              aria-label={`timer in ${name}`}
              title={name}
            />
          );
        })}

        <button type="submit" disabled={isTimerExecuting}>
          OK
        </button>
      </div>
    </form>
  );
};
