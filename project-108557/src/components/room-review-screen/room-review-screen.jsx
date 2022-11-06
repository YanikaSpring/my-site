import React from 'react';
import {getStarsWidth} from '../../utils';
import {reviewPropTypes} from '../../prop-types';

const RoomReviewScreen = (props) => {
  const {reviewData} = props;

  const newDate = new Date(reviewData.date);
  const date = newDate.toLocaleString(`default`, {month: `long`}) + ` ` + newDate.getFullYear();

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={reviewData.user.avatar_url} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {reviewData.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getStarsWidth(reviewData.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {reviewData.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{date}</time>
      </div>
    </li>
  );
};

RoomReviewScreen.propTypes = {
  reviewData: reviewPropTypes,
};

export default RoomReviewScreen;
