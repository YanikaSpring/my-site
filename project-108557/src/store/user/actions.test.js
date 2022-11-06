import {ActionType, requiredAuthorization, setAuthInfo} from './actions';

describe(`Action creators work correctly`, () => {
  it(`Action creator required auth returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: `test`,
    };

    expect(requiredAuthorization(`test`)).toEqual(expectedAction);
  });

  it(`Action creator set auth info returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_AUTH_INFO,
      payload: `test`,
    };

    expect(setAuthInfo(`test`)).toEqual(expectedAction);
  });
});
