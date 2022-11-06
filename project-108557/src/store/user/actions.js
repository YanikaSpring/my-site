import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  SET_AUTH_INFO: `user/login`,
};

export const requiredAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status,
  };
});

export const setAuthInfo = createAction(ActionType.SET_AUTH_INFO, (data) => {
  return {
    payload: data,
  };
});
