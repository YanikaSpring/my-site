import {reducer} from './reducer';
import {ActionType} from './actions';
import {Cities, SortingType} from '../../constants';

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, ActionType.CHANGE_CITY))
      .toEqual({
        activeCity: Cities.PARIS,
        activeSorting: SortingType.POPULAR
      });
  });

  it(`Reducer should add city offer`, () => {
    const state = {
      activeCity: Cities.PARIS,
    };

    const addSityAction = {
      type: ActionType.CHANGE_CITY,
      payload: Cities.BRUSSELS,
    };

    expect(reducer(state, addSityAction))
      .toEqual({activeCity: Cities.BRUSSELS});
  });

  it(`Reducer should add sorting type offer`, () => {
    const state = {
      activeSorting: SortingType.POPULAR,
    };

    const addFavoriteAction = {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortingType.RATED_FIRST,
    };

    expect(reducer(state, addFavoriteAction))
      .toEqual({activeSorting: SortingType.RATED_FIRST});
  });
});
