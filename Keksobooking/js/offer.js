import {getNoun} from './util.js';

const ROOMS = [
  'комната',
  'комнаты',
  'комнат'
];

const GUESTS = [
  'гостя',
  'гостей',
  'гостей'
];

const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPhotos = (block, photos) => {
  photos.forEach((img) => {
    const imgListItem = document.createElement('img');

    imgListItem.classList.add('popup__photo');
    imgListItem.width = 45;
    imgListItem.height = 40;
    imgListItem.alt = 'Фотография жилья';
    imgListItem.src = img;

    block.append(imgListItem);
  });
};

const createFeatures = (block, features) => {
  features.forEach((feature) => {
    const featureListItem = document.createElement('li');
    featureListItem.classList.add('popup__feature');
    featureListItem.classList.add(`popup__feature--${feature}`);

    block.append(featureListItem);
  });
};

const renderSimilarCard = (similarAds) => {
  const {author, offer} = similarAds;
  const {avatar} = author;
  const {title, address, price, rooms, guests, checkin, checkout, description, type, features, photos} = offer;

  const roomsDec = getNoun(rooms, ...ROOMS);
  const guestDec = getNoun(guests, ...GUESTS);

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${roomsDec} для ${guests} ${guestDec}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector('.popup__description').textContent = description;
  cardElement.querySelector('.popup__type').textContent = TYPES[type];
  cardElement.querySelector('.popup__avatar').src = avatar;

  const imgContainer = cardElement.querySelector('.popup__photos');
  const featureContainer = cardElement.querySelector('.popup__features');

  if (features && features.length > 0) {
    featureContainer.innerHTML = '';
    createFeatures(featureContainer, features);
  } else {
    featureContainer.remove();
  }

  if (photos && photos.length > 0) {
    imgContainer.innerHTML = '';
    createPhotos(imgContainer, photos);
  } else {
    imgContainer.remove();
  }

  return cardElement;

};


export {renderSimilarCard};
