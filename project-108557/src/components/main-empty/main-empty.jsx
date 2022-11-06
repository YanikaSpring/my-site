import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';

const MainEmpty = ({activeCity}) => {

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
};

MainEmpty.propTypes = {
  activeCity: PropTypes.string.isRequired,
};

export default MainEmpty;
