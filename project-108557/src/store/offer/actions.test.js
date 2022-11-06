import {
  ActionType,
  loadComments,
  loadOffer,
  loadOffers,
  loadOffersNearby,
  offerNotFound,
  reset
} from './actions';

describe(`Action creators work correctly`, () => {

  it(`Action creator load comments returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: `test`,
    };

    expect(loadComments(`test`)).toEqual(expectedAction);
  });

  it(`Action creator load offer returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFER,
      payload: `test`,
    };

    expect(loadOffer(`test`)).toEqual(expectedAction);
  });

  it(`Action creator load offers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: `test`,
    };

    expect(loadOffers(`test`)).toEqual(expectedAction);
  });

  it(`Action creator load offers nearby returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: `test`,
    };

    expect(loadOffersNearby(`test`)).toEqual(expectedAction);
  });

  it(`Action creator offer not found returns correct action`, () => {
    const expectedAction = {
      type: ActionType.OFFER_NOT_FOUND,
      payload: `test`,
    };

    expect(offerNotFound(`test`)).toEqual(expectedAction);
  });

  it(`Action creator load offer not found returns correct action`, () => {
    const expectedAction = {
      type: ActionType.RESET_DATA,
    };

    expect(reset()).toEqual(expectedAction);
  });
});
