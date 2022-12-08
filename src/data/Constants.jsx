export const routesConstant = {
  HOME_PAGE: "/",
  TIMER_PAGE: "/timer",
  CURRENCIES_PAGE: "currencies",
};

export const navOptions = [
  {
    name: "Home",
    to: routesConstant.HOME_PAGE,
  },
  {
    name: "Timer",
    to: routesConstant.TIMER_PAGE,
  },
  {
    name: "Currencies",
    to: routesConstant.CURRENCIES_PAGE,
  },
];
export const imageVariants = {
  NATURE: "nature",
  TIMER: "watch",
};

export const NAVBAR_BG_IMAGE_MAPPING = {
  0: imageVariants.NATURE,
  1: imageVariants.TIMER,
};

export const apiUrls = {
  QUOTES: "https://type.fit/api/quotes",
  IMAGE: "https://source.unsplash.com/random/",
  WEATHER_ICON_URL: "http://openweathermap.org/img/wn/",
  INVALID_URL_FOR_TESTING: "worn.gocm",
  CURRENCY_CONVERTER: {
    url: "https://api.apilayer.com/currency_data/live?",
    apikey: "BwkllxuLqtcWHEyf3kLdBBizi58f72rx",
  },

  GEO_LOCATION: {
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    apiKey: "AIzaSyBHkWumlGy9mcLNWN0PvOSaNhZg4tD0r1Y",
  },

  WEATHER: {
    url: "https://api.openweathermap.org/data/2.5/weather", //"https://api.openweathermap.org/geo/1.0/reverse", //"https://api.openweathermap.org/data/2.5/weather",
    apiKey: "9a65788e6138758e95e1b15b6a59bef9",
  },

  JSON_DB: "http://localhost:30001/",
};

export const BG_IMAGE_SIZE = "1366×768";
