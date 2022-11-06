import React from 'react';
import Form from '../root-form/root-form';
import {connect} from 'react-redux';
import Review from '../room-review-screen/room-review-screen';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../constants';
import {sortingDate} from '../../utils';
import {getAuthStatusSelector} from '../../store/user/selectors';
import {reviewPropTypes} from '../../prop-types';

const RoomReviewsList = (props) => {
  const {reviewsData = [], authorizationStatus, offerId} = props;

  let reviews = [];
  if (reviewsData.length > 0) {
    reviews = sortingDate(reviewsData).slice(0, 10);
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((element) => (
          <Review
            reviewData={element}
            key={`${element.id}_${element.date}`}
          />
        ))}
      </ul>
      {
        authorizationStatus === AuthorizationStatus.AUTH && <Form offerId={offerId} />

      }
    </section>
  );
};

RoomReviewsList.propTypes = {
  reviewsData: PropTypes.arrayOf(reviewPropTypes),
  authorizationStatus: PropTypes.string.isRequired,
  offerId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatusSelector(state),
});


export {RoomReviewsList};
export default connect(mapStateToProps)(RoomReviewsList);
