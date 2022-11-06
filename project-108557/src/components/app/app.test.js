import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus, Cities, SortingType} from '../../constants';
import {NameSpace} from '../../store/root-reducer';
import App from './app';

import {offerMocks, auth, offersMocks} from '../../store/tests.mocks';

const mockStore = configureStore({});
describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'MainScreen' when user navigate to '/' url`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.OFFER]: {
        offers: [],
        isDataLoaded: true
      },
      [NameSpace.MAIN]: {
        activeCity: Cities.PARIS,
        activeSorting: SortingType.POPULAR
      },
    });


    const history = createMemoryHistory();
    history.push(`/`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Cities`)).toBeInTheDocument();
  });

  it(`Render 'Login' when user navigate to '/login' url`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.OFFER]: {
        offers: [],
        isDataLoaded: true
      },
      [NameSpace.MAIN]: {
        activeCity: Cities.PARIS,
        activeSorting: SortingType.POPULAR
      },
    });

    const history = createMemoryHistory();
    history.push(`/login`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`E-mail`)).toBeInTheDocument();
    expect(screen.getByText(`Password`)).toBeInTheDocument();
  });

  it(`Render 'RoomContainer' when user navigate to '/offer/:id' url`, async () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.OFFER]: {
        offer: offerMocks,
        offers: offersMocks,
        isDataLoaded: true,
        isOfferLoaded: true,
        isOffersNearbyLoaded: true,
        isCommentsLoaded: true,
        offersNearby: offersMocks,
        comments: [],
        isOfferNotFound: false
      },
      [NameSpace.MAIN]: {
        activeCity: Cities.PARIS,
        activeSorting: SortingType.POPULAR
      },
    });

    const history = createMemoryHistory();
    history.push(`/offer/1`);

    store.dispatch = () => Promise.resolve();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Beaut;kl;kl;kkliful & luxurious studio at great location`)).toBeInTheDocument();
    });
  });

  it(`Render 'Favorites' when user navigates to '/favorites' url`, async () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: auth
      },
      [NameSpace.OFFER]: {
        offer: offerMocks,
        offers: offersMocks,
        isDataLoaded: true,
        isOfferLoaded: true,
        isOffersNearbyLoaded: true,
        isCommentsLoaded: true,
        offersNearby: offersMocks,
        comments: [],
        isOfferNotFound: false
      },
      [NameSpace.MAIN]: {
        activeCity: Cities.PARIS,
        activeSorting: SortingType.POPULAR
      },
      [NameSpace.FAVORITES]: {
        favorite: offersMocks,
      },
    });

    const history = createMemoryHistory();
    history.push(`/favorites`);

    store.dispatch = () => Promise.resolve();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
    });
  });

  it(`Render 'NotFoundScreen' when user navigate to non-existent route`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.OFFER]: {
        offers: [],
        isDataLoaded: true
      },
      [NameSpace.MAIN]: {
        activeCity: Cities.PARIS,
        activeSorting: SortingType.POPULAR
      },
    });

    const history = createMemoryHistory();
    history.push(`/non-existent-route`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Перейти на главную`)).toBeInTheDocument();
  });
});
