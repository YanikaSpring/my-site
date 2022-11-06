import {loadFavorite} from './actions';
import {ApiRoute} from '../../constants';

export const fetchFavorite = () => (dispatch, _getState, api) => {
  return api.get(ApiRoute.FAVORITE)
    .then(({data}) => dispatch(loadFavorite(data)));
};

export const postFavorite = (id, status) => (dispatch, _getState, api) => {
  return api.post(ApiRoute.FAVORITE_BY_ID.replace(`:id`, id).replace(`:status`, status));
};
