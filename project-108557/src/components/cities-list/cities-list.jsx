import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeCity} from '../../store/main/actions';
import {Cities} from '../../constants';

import {getActiveCitySelector} from '../../store/main/selectors';

import cn from 'classnames';

const CitiesList = (props) => {
  const {activeCity, onChangeCity} = props;

  const handleChangeCityClick = (evt) => {
    evt.preventDefault();
    onChangeCity(evt.target.innerText);
  };

  return (
    <ul className="locations__list tabs__list">
      {Object.values(Cities).map((city) => (
        <li className="locations__item" key={`${city}_${new Date()}`}>
          <a className={cn(`locations__item-link tabs__item`, {'tabs__item--active': city === activeCity})} href="#" onClick={handleChangeCityClick}>
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCitySelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(changeCity(city));
  },
});

CitiesList.propTypes = {
  activeCity: PropTypes.string,
  onChangeCity: PropTypes.func,
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
