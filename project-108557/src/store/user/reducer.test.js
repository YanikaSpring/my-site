import {reducer} from './reducer';
import {ActionType} from './actions';
import {AuthorizationStatus} from '../../constants';
import {userInfoMock} from '../tests.mocks';

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, ActionType.REQUIRED_AUTHORIZATION))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userInfo: {},
      });
  });

  it(`Reducer should auth`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    };

    const authAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(reducer(state, authAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });

  it(`Reducer should add user info`, () => {
    const state = {
      userInfo: {},
    };

    const addUserInfoAction = {
      type: ActionType.SET_AUTH_INFO,
      payload: userInfoMock,
    };

    expect(reducer(state, addUserInfoAction))
      .toEqual({userInfo: userInfoMock});
  });
});
