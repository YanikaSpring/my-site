import get from 'lodash/get';
import {NameSpace} from '../root-reducer';

export const getFavotitesSelector = (state) => get(state, `${NameSpace.FAVORITES}.favorite`, []);
