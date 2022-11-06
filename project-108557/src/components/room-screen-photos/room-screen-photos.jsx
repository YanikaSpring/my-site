import React from 'react';
import {offerPropTypes} from '../../prop-types';

const RoomScreenPhotos = ({cardData}) => {

  const imagesList = cardData.images.slice(0, 6);

  return (
    imagesList.map((element, index) => (
      <div className="property__image-wrapper" key={`${index}_${Date.now()}`}>
        <img className="property__image" src={element} alt="Photo studio" />
      </div>
    ))
  );
};

RoomScreenPhotos.propTypes = {
  cardData: offerPropTypes,
};

export default RoomScreenPhotos;
