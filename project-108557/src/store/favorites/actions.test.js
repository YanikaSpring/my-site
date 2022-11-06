import {ActionType, loadFavorite} from './actions';

describe(`Action creators work correctly`, () => {

  it(`Action creator load favorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE,
      payload: `test`,
    };

    expect(loadFavorite(`test`)).toEqual(expectedAction);
  });
});
