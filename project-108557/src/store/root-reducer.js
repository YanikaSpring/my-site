import {combineReducers} from 'redux';
import {reducer as favoritesReducer} from './favorites/reducer';
import {reducer as mainReducer} from './main/reducer';
import {reducer as offerReducer} from './offer/reducer';
import {reducer as userReducer} from './user/reducer';

export const NameSpace = {
  FAVORITES: `FAVORITES`,
  MAIN: `MAIN`,
  OFFER: `OFFER`,
  USER: `USER`,
};

const rootReducer = combineReducers({
  [NameSpace.FAVORITES]: favoritesReducer,
  [NameSpace.MAIN]: mainReducer,
  [NameSpace.OFFER]: offerReducer,
  [NameSpace.USER]: userReducer,
});

export {rootReducer};
