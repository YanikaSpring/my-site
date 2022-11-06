import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_OFFERS: `offers/loadOffers`,
  LOAD_OFFER: `offers/loadOffer`,
  LOAD_OFFERS_NEARBY: `offers/loadOffersNearby`,
  LOAD_COMMENTS: `offers/loadComments`,
  STATUS_COMMENT_SENDING: `offer/statusCommentSending`,
  RESET_DATA: `offers/reset`,
  OFFER_NOT_FOUND: `offer/notFound`,
};

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (data) => {
  return {
    payload: data,
  };
});

export const loadOffer = createAction(ActionType.LOAD_OFFER, (data) => {
  return {
    payload: data,
  };
});

export const loadOffersNearby = createAction(ActionType.LOAD_OFFERS_NEARBY, (data) => {
  return {
    payload: data,
  };
});

export const loadComments = createAction(ActionType.LOAD_COMMENTS, (data) => {
  return {
    payload: data,
  };
});

export const statusCommentSending = createAction(ActionType.STATUS_COMMENT_SENDING, (data) => {
  return {
    payload: data,
  };
});

export const reset = createAction(ActionType.RESET_DATA);

export const offerNotFound = createAction(ActionType.OFFER_NOT_FOUND, (data) => {
  return {
    payload: data,
  };
});
