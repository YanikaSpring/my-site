import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PropTypes from 'prop-types';
import {offerNotFound} from '../../store/offer/actions';
import {
  getOfferSelector,
  getOffersNearbySelector,
  getCommentsSelector,
  getStatusLoadOfferSelector,
  getStatusLoadOffersNearbySelector,
  getStatusLoadCommentsSelector,
  getStatusNotFoundOfferSelector
} from '../../store/offer/selectors';

import {
  fetchOffer,
  fetchComments,
  fetchOffersNearby
} from '../../store/offer/operations';
import LoadingScreen from '../loading-screen/loading-screen';
import {offerPropTypes, reviewPropTypes} from '../../prop-types';

const RoomContainer = (props) => {
  const {
    offer,
    offersNearby,
    comments,
    isOfferLoaded,
    isOffersNearbyLoaded,
    isCommentsLoaded,
    onFetchRoomInfo,
    isOfferNotFound,
    refreshStatus
  } = props;
  const {id} = useParams();

  useEffect(() => {
    refreshStatus();
    onFetchRoomInfo(id);
  }, [id]);

  if (isOfferNotFound) {
    return <NotFoundScreen />;
  }

  if (!isOfferLoaded || !isOffersNearbyLoaded || !isCommentsLoaded) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return (
      <NotFoundScreen />
    );
  }

  return <RoomScreen cardData={offer} reviewsData={comments} otherOffers={offersNearby} />;
};

RoomContainer.propTypes = {
  offer: PropTypes.oneOfType([PropTypes.oneOf([null]).isRequired, PropTypes.object.isRequired]),
  offersNearby: PropTypes.arrayOf(offerPropTypes),
  comments: PropTypes.arrayOf(reviewPropTypes),
  isOfferLoaded: PropTypes.bool.isRequired,
  isOffersNearbyLoaded: PropTypes.bool.isRequired,
  isCommentsLoaded: PropTypes.bool.isRequired,
  onFetchRoomInfo: PropTypes.func,
  isOfferNotFound: PropTypes.bool,
  refreshStatus: PropTypes.func,
  onChangeCity: PropTypes.func,
};

const mapStateToProps = (state) => ({
  offer: getOfferSelector(state),
  offersNearby: getOffersNearbySelector(state),
  comments: getCommentsSelector(state),
  isOfferLoaded: getStatusLoadOfferSelector(state),
  isOffersNearbyLoaded: getStatusLoadOffersNearbySelector(state),
  isCommentsLoaded: getStatusLoadCommentsSelector(state),
  isOfferNotFound: getStatusNotFoundOfferSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  refreshStatus() {
    dispatch(offerNotFound(false));
  },
  onFetchRoomInfo(id) {
    dispatch(fetchOffer(id));
    dispatch(fetchComments(id));
    dispatch(fetchOffersNearby(id));
  },
});

export {RoomContainer};
export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);
