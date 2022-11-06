import {ActionType, redirectToRoute} from './actions';

describe(`Action creators work correctly`, () => {
  it(`Action creator redirect to route returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `test`,
    };

    expect(redirectToRoute(`test`)).toEqual(expectedAction);
  });
});
