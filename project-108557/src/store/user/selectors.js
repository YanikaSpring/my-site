import get from 'lodash/get';
import {NameSpace} from '../root-reducer';
import {AuthorizationStatus} from '../../constants';

export const getAuthStatusSelector = (state) => get(state, `${NameSpace.USER}.authorizationStatus`, AuthorizationStatus.NO_AUTH);
export const getUserInfoSelector = (state) => get(state, `${NameSpace.USER}.userInfo`, {});
