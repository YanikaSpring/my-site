import {ActionType} from './actions';
import {Statuses} from '../../constants';

const initialState = {
  offers: [],
  offer: null,
  offersNearby: [],
  comments: [],
  isDataLoaded: false,
  isOfferLoaded: false,
  isOffersNearbyLoaded: false,
  isCommentsLoaded: false,
  offerNotFound: false,
  statusCommentSending: Statuses.SUCCESS
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true
      };
    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: action.payload,
        isOfferLoaded: true
      };
    case ActionType.LOAD_OFFERS_NEARBY:
      return {
        ...state,
        offersNearby: action.payload,
        isOffersNearbyLoaded: true
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        isCommentsLoaded: true
      };
    case ActionType.RESET_DATA:
      return {
        ...state,
        isOfferLoaded: false,
        isOffersNearbyLoaded: false,
        isCommentsLoaded: false,
      };
    case ActionType.OFFER_NOT_FOUND:
      return {
        ...state,
        offerNotFound: action.payload
      };
    case ActionType.STATUS_COMMENT_SENDING:
      return {
        ...state,
        statusCommentSending: action.payload
      };
  }

  return state;
};


export {reducer};
