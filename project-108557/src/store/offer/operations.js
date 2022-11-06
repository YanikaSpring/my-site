import {
  loadComments,
  loadOffer,
  loadOffers,
  loadOffersNearby,
  offerNotFound,
  statusCommentSending
} from './actions';
import {ApiRoute, Statuses} from '../../constants';

export const fetchOffersList = () => (dispatch, _getState, api) => {
  return api.get(ApiRoute.HOTELS)
    .then(({data}) => dispatch(loadOffers(data)));
};

export const fetchOffer = (id) => (dispatch, _getState, api) => {
  return api.get(ApiRoute.HOTELS_BY_ID.replace(`:id`, id))
    .then(({data}) => dispatch(loadOffer(data)))
    .catch(() => dispatch(offerNotFound(true)));
};

export const fetchOffersNearby = (id) => (dispatch, _getState, api) => {
  return api.get(ApiRoute.HOTELS_NEARBY.replace(`:id`, id))
    .then(({data}) => dispatch(loadOffersNearby(data)));
};

export const fetchComments = (id) => (dispatch, _getState, api) => {
  return api.get(ApiRoute.COMMENTS_BY_ID.replace(`:id`, id))
    .then(({data}) => dispatch(loadComments(data)));
};

export const postComments = (id, comment, rating) => (dispatch, _getState, api) => {
  return api.post(ApiRoute.COMMENTS_BY_ID.replace(`:id`, id), {comment, rating})
    .then(({data}) => dispatch(loadComments(data)))
    .then(() => dispatch(statusCommentSending(Statuses.SUCCESS)))
    .catch(() => dispatch(statusCommentSending(Statuses.ERROR)));
};
