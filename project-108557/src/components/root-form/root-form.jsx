import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postComments} from '../../store/offer/operations';
import {getCommentStatusPendingSelector} from '../../store/offer/selectors';
import {Statuses} from '../../constants';

const RootForm = (props) => {
  const {offerId, onFetchComment, commentSendingStatus} = props;
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState(``);

  const handleRating = (evt) => {
    const ratingValue = Number(evt.target.value);
    setRating(ratingValue);
  };

  const handleReview = (env) => {
    const reviewText = String(env.target.value).trim();
    setReview(reviewText);
  };

  const handleSubmitFetchComment = (evt) => {
    evt.preventDefault();
    onFetchComment(offerId, review, rating);
    setRating(4);
    setReview(``);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitFetchComment}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleRating} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={rating === 4} onChange={handleRating} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleRating} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleRating} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleRating} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={review} onChange={handleReview}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={review.length < 50 || review.length > 300 || commentSendingStatus === Statuses.PENDING}>Submit</button>
      </div>
      {commentSendingStatus === Statuses.ERROR && <div style={{color: `red`}}><span>Oups... Review sending error!</span></div>}
    </form>
  );
};

RootForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  onFetchComment: PropTypes.func.isRequired,
  commentSendingStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  commentSendingStatus: getCommentStatusPendingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFetchComment(id, comment, rating) {
    dispatch(postComments(id, comment, rating));
  }
});

export {RootForm};
export default connect(mapStateToProps, mapDispatchToProps)(RootForm);

