import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getStarsWidth} from '../../utils';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {postFavorite} from '../../store/favorites/operations';
import {getFavotitesSelector} from '../../store/favorites/selectors';
import {AuthorizationStatus, AppRoute, FavoriteStatus} from '../../constants';

import {getAuthStatusSelector} from '../../store/user/selectors';
import {offerPropTypes} from '../../prop-types';

import cn from 'classnames';

const CardScreen = (props) => {

  const {cardData, favorites = [], onMouseEnter, onMouseLeave, onPostFavorite, authorizationStatus} = props;

  const [isFavorite, setIsFavorite] = useState(favorites.some((element) => element.id === cardData.id));
  const history = useHistory();

  const handleMouseOn = (id) => () => onMouseEnter(id);

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
    } else {
      onPostFavorite(cardData.id, isFavorite ? FavoriteStatus.REMOVE : FavoriteStatus.ADD);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <article className="cities__place-card place-card" onMouseEnter={handleMouseOn(cardData.id)} onMouseLeave={onMouseLeave}>
      {
        cardData.is_premium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${cardData.id}`}>
          <img className="place-card__image" src={cardData.preview_image} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cardData.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={cn(`button place-card__bookmark-button`, {'place-card__bookmark-button--active': isFavorite})} type="button" onClick={handleFavoriteClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getStarsWidth(cardData.rating)}%`}} ></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${cardData.id}`}>
            {cardData.title}
          </Link>
        </h2>
        <p className="place-card__type">{cardData.type}</p>
      </div>
    </article>
  );
};

CardScreen.propTypes = {
  cardData: offerPropTypes,
  favorites: PropTypes.arrayOf(offerPropTypes),
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onPostFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatusSelector(state),
  favorites: getFavotitesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPostFavorite(id, status) {
    dispatch(postFavorite(id, status));
  }
});

export {CardScreen};
export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);
