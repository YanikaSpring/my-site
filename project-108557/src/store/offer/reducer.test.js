import {reducer} from './reducer';
import {ActionType} from './actions';
import {offersMocks, offerMocks, commentsMocks} from '../tests.mocks';
import {Statuses} from '../../constants';

describe(`Offers reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, ActionType.LOAD_OFFERS))
      .toEqual({
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
      });
  });

  it(`Reducer should add offer`, () => {
    const state = {
      offer: null,
      isOfferLoaded: false
    };

    const addOfferAction = {
      type: ActionType.LOAD_OFFER,
      payload: offerMocks,
    };

    expect(reducer(state, addOfferAction))
      .toEqual({
        offer: offerMocks,
        isOfferLoaded: true
      });
  });

  it(`Reducer should add offers`, () => {
    const state = {
      offers: [],
      isDataLoaded: false
    };

    const addOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: offersMocks,
    };

    expect(reducer(state, addOffersAction))
      .toEqual({
        offers: offersMocks,
        isDataLoaded: true
      });
  });

  it(`Reducer should add offers nearby`, () => {
    const state = {
      offersNearby: [],
      isOffersNearbyLoaded: false
    };

    const addOffersNearbyAction = {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: offersMocks,
    };

    expect(reducer(state, addOffersNearbyAction))
      .toEqual({
        offersNearby: offersMocks,
        isOffersNearbyLoaded: true
      });
  });

  it(`Reducer should add comments`, () => {
    const state = {
      comments: [],
      isCommentsLoaded: true
    };

    const addCommitsAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: commentsMocks,
    };

    expect(reducer(state, addCommitsAction))
      .toEqual({
        comments: commentsMocks,
        isCommentsLoaded: true
      });
  });

  it(`Reducer should set found`, () => {
    const state = {
      offerNotFound: false
    };

    const setFoundAction = {
      type: ActionType.OFFER_NOT_FOUND,
      payload: true,
    };

    expect(reducer(state, setFoundAction))
      .toEqual({
        offerNotFound: true
      });
  });

  it(`Reducer should reset`, () => {
    const state = {
      isOfferLoaded: true,
      isOffersNearbyLoaded: true,
      isCommentsLoaded: true,
    };

    const resetAction = {
      type: ActionType.RESET_DATA,
      payload: true,
    };

    expect(reducer(state, resetAction))
      .toEqual({
        isOfferLoaded: false,
        isOffersNearbyLoaded: false,
        isCommentsLoaded: false,
      });
  });

  it(`Reducer should add status comment sending`, () => {
    const state = {
      statusCommentSending: Statuses.SUCCESS,
    };

    const addCommitsAction = {
      type: ActionType.STATUS_COMMENT_SENDING,
      payload: Statuses.ERROR,
    };

    expect(reducer(state, addCommitsAction))
      .toEqual({
        statusCommentSending: Statuses.ERROR
      });
  });
});
