import get from 'lodash/get';
import {NameSpace} from '../root-reducer';
import {Statuses} from '../../constants';

export const getOffersSelector = (state) => get(state, `${NameSpace.OFFER}.offers`, []);
export const getOfferSelector = (state) => get(state, `${NameSpace.OFFER}.offer`, null);
export const getOffersNearbySelector = (state) => get(state, `${NameSpace.OFFER}.offersNearby`, []);
export const getCommentsSelector = (state) => get(state, `${NameSpace.OFFER}.comments`, []);
export const getStatusLoadOfferSelector = (state) => get(state, `${NameSpace.OFFER}.isOfferLoaded`, false);
export const getStatusLoadOffersNearbySelector = (state) => get(state, `${NameSpace.OFFER}.isOffersNearbyLoaded`, false);
export const getStatusLoadCommentsSelector = (state) => get(state, `${NameSpace.OFFER}.isCommentsLoaded`, false);
export const getStatusNotFoundOfferSelector = (state) => get(state, `${NameSpace.OFFER}.offerNotFound`, false);
export const getLoadStatusSelector = (state) => get(state, `${NameSpace.OFFER}.isDataLoaded`, false);
export const getCommentStatusPendingSelector = (state) => get(state, `${NameSpace.OFFER}.statusCommentSending`, Statuses.SUCCESS);
