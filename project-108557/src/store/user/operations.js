import {requiredAuthorization, setAuthInfo} from './actions';
import {redirectToRoute} from '../middlewares/actions';
import {AuthorizationStatus, ApiRoute} from '../../constants';

export const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(ApiRoute.LOGIN)
    .then((dataObj) => dispatch(setAuthInfo(dataObj.data)))
    .then(() => dispatch(requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {});
};

export const login = ({email, password}) => (dispatch, _getState, api) => {
  return api.post(ApiRoute.LOGIN, {email, password})
    .then((dataObj) => dispatch(setAuthInfo(dataObj.data)))
    .then(() => dispatch(requiredAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(`/`)));
};

export const logout = () => (dispatch, _getState, api) => {
  return api.get(ApiRoute.LOGOUT)
    .then(() => dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH)));
};
