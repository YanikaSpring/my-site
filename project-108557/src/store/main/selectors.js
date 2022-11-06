import get from 'lodash/get';
import {NameSpace} from '../root-reducer';
import {Cities, SortingType} from '../../constants';

export const getActiveCitySelector = (state) => get(state, `${NameSpace.MAIN}.activeCity`, Cities.PARIS);
export const getActiveSortingSelector = (state) => get(state, `${NameSpace.MAIN}.activeSorting`, SortingType.POPULAR);
