import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  CHANGE_SORT_TYPE: `main/changeSortType`,
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => {
  return {
    payload: city,
  };
});

export const changeSortType = createAction(ActionType.CHANGE_SORT_TYPE, (sortType) => {
  return {
    payload: sortType,
  };
});
