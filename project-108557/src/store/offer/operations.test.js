import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import * as operations from './operations';
import {ActionType} from './actions';
import {ApiRoute, Statuses} from '../../constants';
import {offersMocks, offerMocks, commentsMocks} from '../tests.mocks';

const api = createAPI(() => {});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkOffersLoader = operations.fetchOffersList();

    apiMock
      .onGet(ApiRoute.HOTELS)
      .reply(200, offersMocks);

    return checkOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: offersMocks,
        });
      });
  });

  it(`Should make a incorrect API call to /hotels/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 12;
    const checkOfferLoader = operations.fetchOffer(fakeId);

    apiMock
      .onGet(ApiRoute.HOTELS_BY_ID)
      .reply(200, offerMocks);

    return checkOfferLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.OFFER_NOT_FOUND,
          payload: true,
        });
      });
  });

  it(`Should make a correct API call to /hotels/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 12;
    const checkOfferLoader = operations.fetchOffer(fakeId);

    apiMock
      .onGet(ApiRoute.HOTELS_BY_ID.replace(`:id`, fakeId))
      .reply(200, offerMocks);

    return checkOfferLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: offerMocks,
        });
      });
  });

  it(`Should make a correct API call to /hotels/:id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 12;
    const checkOffersNearbyLoader = operations.fetchOffersNearby(fakeId);

    apiMock
      .onGet(ApiRoute.HOTELS_NEARBY.replace(`:id`, fakeId))
      .reply(200, offersMocks);

    return checkOffersNearbyLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_NEARBY,
          payload: offersMocks,
        });
      });
  });

  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 12;
    const checkCommentsLoader = operations.fetchComments(fakeId);

    apiMock
      .onGet(ApiRoute.COMMENTS_BY_ID.replace(`:id`, fakeId))
      .reply(200, commentsMocks);

    return checkCommentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: commentsMocks,
        });
      });
  });

  it(`Should make a correct API post to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 12;
    const fakeRating = 5;
    const fakeComment = `test`;
    const commentLoader = operations.postComments(fakeId, fakeComment, fakeRating);

    apiMock
      .onPost(ApiRoute.COMMENTS_BY_ID.replace(`:id`, fakeId))
      .reply(200, commentsMocks);

    return commentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: commentsMocks,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.STATUS_COMMENT_SENDING,
          payload: Statuses.SUCCESS,
        });
      });
  });
});
