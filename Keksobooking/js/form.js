import {resetSlider} from './slider.js';
import {resetMap} from './map.js';
import {resetPhotos} from './photos.js';
import {resetValidation} from './validation.js';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const switchFormState = (isDisabled) => {
  const formElements = form.querySelectorAll('fieldset');

  if (isDisabled) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }

  formElements.forEach((item) => {
    item.disabled = isDisabled;
  });
};

const switchFilterState = (isDisabled) => {
  const filterElements = mapFilters.querySelectorAll('select, fieldset');

  if (isDisabled) {
    mapFilters.classList.add('map__filters--disabled');
  } else {
    mapFilters.classList.remove('map__filters--disabled');
  }

  filterElements.forEach((selects) => {
    selects.disabled = isDisabled;
  });
};

const getCoordinates = (coordinates) => {
  addressField.value = `${Number(coordinates.lat.toFixed(5))}, ${Number(coordinates.lng.toFixed(5))}`;
};

const clearForm = () => {
  form.reset();
  mapFilters.reset();
};

const resetPage = () => {
  clearForm();
  resetValidation();
  resetSlider();
  resetMap();
  resetPhotos();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

export {switchFormState, getCoordinates, resetPage, switchFilterState};
