export const Cities = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`
};

export const SortingType = {
  POPULAR: `Popular`,
  PRICE_LOW_HIGH: `Price: low to high`,
  PRICE_HIGH_LOW: `Price: high to low`,
  RATED_FIRST: `Top rated first`
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const AppRoute = {
  LOGIN: `/login`,
  MAIN: `/`,
  FAVORITES: `/favorites`,
  OFFER: `/offer/:id`,
};

export const ApiRoute = {
  HOTELS: `/hotels`,
  HOTELS_BY_ID: `/hotels/:id`,
  HOTELS_NEARBY: `/hotels/:id/nearby`,
  FAVORITE: `/favorite`,
  FAVORITE_BY_ID: `/favorite/:id/:status`,
  COMMENTS: `/comments/`,
  COMMENTS_BY_ID: `/comments/:id`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
};

export const FavoriteStatus = {
  ADD: `1`,
  REMOVE: `0`,
};

export const Statuses = {
  PENDING: `pending`,
  SUCCESS: `success`,
  ERROR: `status/error`
};
