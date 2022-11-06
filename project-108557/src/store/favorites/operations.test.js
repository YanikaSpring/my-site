import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import * as operations from './operations';
import {ActionType} from './actions';
import {ApiRoute} from '../../constants';
import {offersMocks} from '../tests.mocks';

const api = createAPI(() => {});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /favorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkFavoriteLoader = operations.fetchFavorite();

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(200, offersMocks);

    return checkFavoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE,
          payload: offersMocks,
        });
      });
  });
});
