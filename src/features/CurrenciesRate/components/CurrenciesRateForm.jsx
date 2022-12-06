import React, { useState } from "react";

export const CurrenciesRateForm = ({ handleCurrenciesConfig }) => {
  const options = [
    {
      name: "Euro",
      code: "EUR",
    },
    {
      name: "Indian Rupees",
      code: "INR",
    },
    {
      name: "United States Dollar",
      code: "USD",
    },
    {
      name: "Singapore Dollar",
      code: "SGD",
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState({
    source: "",
    currencies: "",
  });

  const swapCurrenciesInputs = () => {
    setSelectedOptions((prevVal) => ({
      ...prevVal,
      source: selectedOptions.currencies,
      currencies: selectedOptions.source,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCurrenciesConfig(selectedOptions);
  };

  const isCurrenciesRateFormValid = () => {
    return Object.values(selectedOptions).includes("");
  };

  const currenciesInputs = [
    {
      name: "source",
    },
    {
      name: "currencies",
    },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-centered-column">
        <div className="flex-display" style={{ alignItems: "center" }}>
          {currenciesInputs.map(({ name }, index) => {
            return (
              <>
                <select
                  id={name}
                  value={selectedOptions[name]}
                  onChange={(e) => {
                    setSelectedOptions({
                      ...selectedOptions,
                      [name]: e.target.value,
                    });
                  }}
                  className="select-custom"
                >
                  <option value="">--- Select Currency ---</option>
                  {options.map(({ name, code }) => {
                    return (
                      <option
                        key={code}
                        value={code}
                        selected
                        className={`${
                          Object.values(selectedOptions).includes(code)
                            ? "hide"
                            : "show"
                        }`}
                      >
                        {name}
                      </option>
                    );
                  })}
                </select>
                {index === 0 && (
                  <button type="button" onClick={swapCurrenciesInputs}>
                    <i className="fa fa-exchange fa-lg" />
                  </button>
                )}
              </>
            );
          })}
        </div>
        <div className="flex-display">
          <button type="submit" disabled={isCurrenciesRateFormValid()}>
            OK
          </button>
        </div>
      </div>
    </form>
  );
};
