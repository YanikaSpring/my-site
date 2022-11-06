import {ActionType, changeCity, changeSortType} from './actions';

describe(`Action creators work correctly`, () => {
  it(`Action creator change city returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: `test`,
    };

    expect(changeCity(`test`)).toEqual(expectedAction);
  });

  it(`Action creator change sort type returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `test`,
    };

    expect(changeSortType(`test`)).toEqual(expectedAction);
  });
});
