import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainScreen from '../main-screen/main-screen';
import Login from '../login-screen/login-screen';
import PrivateRoute from '../private-route/private-route';
import RoomContainer from '../room-container/room-container';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import FavoriteScreen from '../favorites-screen/favorites-screen';
import {AppRoute} from '../../constants.js';

import {fetchOffersList} from '../../store/offer/operations';
import {fetchFavorite} from '../../store/favorites/operations';
import {checkAuth} from '../../store/user/operations';
import LoadingScreen from '../loading-screen/loading-screen';

import {getOffersSelector, getLoadStatusSelector} from '../../store/offer/selectors.js';

const App = (props) => {
  const {offers, isDataLoaded, onFetchFavorite} = props;

  useEffect(() => {
    if (!isDataLoaded) {
      onFetchFavorite();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Switch>
      <Route path={AppRoute.MAIN} exact >
        <MainScreen cardsData={offers} />
      </Route>
      <PrivateRoute path={AppRoute.FAVORITES} exact render={() => <FavoriteScreen /> } />
      <Route path={AppRoute.LOGIN} exact >
        <Login />
      </Route>
      <Route path={AppRoute.OFFER} exact >
        <RoomContainer />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  offers: getOffersSelector(state),
  isDataLoaded: getLoadStatusSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFavorite() {
    dispatch(fetchOffersList());
    dispatch(checkAuth());
    dispatch(fetchFavorite());
  }
});

App.propTypes = {
  offers: PropTypes.array.isRequired,
  onFetchFavorite: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
