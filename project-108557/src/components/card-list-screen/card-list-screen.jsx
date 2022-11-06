import React from 'react';
import PropTypes from 'prop-types';
import CardScreen from '../card-screen/card-screen';

const CardListScreen = (props) => {
  const {cardsData = [], onMouseEnter, onMouseLeave} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {cardsData.map((element) => (
        <CardScreen
          cardData={element}
          key={`${element.id}_${element.title}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  );
};

CardListScreen.propTypes = {
  cardsData: PropTypes.array.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default CardListScreen;
