import React, {useEffect} from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getStarsWidth} from '../../utils';
import {getFavoritesByCity} from '../../utils';
import {Link} from 'react-router-dom';
import {postFavorite, fetchFavorite} from '../../store/favorites/operations';
import {FavoriteStatus, AppRoute} from '../../constants';
import {changeCity} from '../../store/main/actions';
import {getFavotitesSelector} from '../../store/favorites/selectors';

import FavoritesEmpty from './favorites-empty';

import cn from 'classnames';

const FavoriteScreen = (props) => {
  const {onFetchFavorite, favorites = [], onPostFavorite, onChangeCity} = props;

  useEffect(() => {
    onFetchFavorite();
  }, []);

  const favoritesByCity = getFavoritesByCity(favorites);

  const handleFavoriteClick = (id, isFavorite) => {
    onPostFavorite(id, isFavorite ? FavoriteStatus.REMOVE : FavoriteStatus.ADD);
    onFetchFavorite();
  };

  const handleChangeCityClick = (city) => {
    onChangeCity(city);
  };

  if (favorites.length === 0) {
    return <FavoritesEmpty />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCity).map(([city, savedOffers]) => (
                <li className="favorites__locations-items" key={`${city}_${new Date()}`}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.MAIN} onClick={() => handleChangeCityClick(city)}>
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {savedOffers.map((element) => (
                      <article className="favorites__card place-card" key={`${element.id}_${element.title}`}>
                        {
                          element.is_premium && (
                            <div className="place-card__mark">
                              <span>Premium</span>
                            </div>
                          )
                        }
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={`/offer/${element.id}`} onClick={() => handleChangeCityClick(element.city.name)}>
                            <img className="place-card__image" src={element.preview_image} width="150" height="110" alt="Place image" />
                          </Link>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{element.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            <button className={cn(`button place-card__bookmark-button`, {'place-card__bookmark-button--active': element.is_favorite})} type="button" onClick={() => handleFavoriteClick(element.id, element.is_favorite)}>
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{width: `${getStarsWidth(element.rating)}%`}}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link to={`/offer/${element.id}`} onClick={() => handleChangeCityClick(element.city.name)}>{element.title}</Link>
                          </h2>
                          <p className="place-card__type">{element.type}</p>
                        </div>
                      </article>
                    ))
                    }
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

FavoriteScreen.propTypes = {
  favorites: PropTypes.array.isRequired,
  onFetchFavorite: PropTypes.func,
  onPostFavorite: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavotitesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFavorite() {
    dispatch(fetchFavorite());
  },
  onPostFavorite(id, status) {
    dispatch(postFavorite(id, status));
  },
  onChangeCity(city) {
    dispatch(changeCity(city));
  },
});

export {FavoriteScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
