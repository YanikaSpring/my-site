import {ActionType} from './actions';

const initialState = {
  favorite: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };
  }

  return state;
};


export {reducer};
