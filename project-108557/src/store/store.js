import {createAPI} from '../api';
import {rootReducer} from './root-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {redirect} from './middlewares/redirect';
import * as userAction from './user/actions';
import {AuthorizationStatus} from '../constants';

const api = createAPI(
    () => store.dispatch(userAction.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

export default store;
