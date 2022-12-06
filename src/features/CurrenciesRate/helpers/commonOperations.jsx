export const getSourceCurrenciesFromId = (id) => {
  return id.split("_");
};

export const generateIdFromSourceCurrencies = (source, currencies) => {
  return `${source}_${currencies}`;
};
