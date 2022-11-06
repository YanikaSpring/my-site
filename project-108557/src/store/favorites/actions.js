import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_FAVORITE: `offers/loadFavorite`,
};

export const loadFavorite = createAction(ActionType.LOAD_FAVORITE, (data) => {
  return {
    payload: data,
  };
});
