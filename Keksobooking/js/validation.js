import {showSuccessMessage, showErrorMessage} from './user-modal.js';
import {resetPage} from './form.js';
import {sendData} from './api.js';

const MIN_SYMBOLS = 30;
const MAX_SYMBOLS = 100;
const MAX_PRICE = 100000;
const MIN_GUESTS = 0;
const MAX_ROOMS = 100;

const orderForm = document.querySelector('.ad-form');
const roomsField = orderForm.querySelector('[name="rooms"]');
const capacityField = orderForm.querySelector('[name="capacity"]');
const priceField = orderForm.querySelector('#price');
const typeHousing = orderForm.querySelector('#type');
const timeIn = orderForm.querySelector('#timein');
const timeOut = orderForm.querySelector('#timeout');
const buttonSubmit = document.querySelector('.ad-form__submit');
const sliderElement = document.querySelector('.ad-form__slider');

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const roomsOption = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};


const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Отправить';
};

const createPristineInstance = () => new Pristine(orderForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const getGuestsErrorMessage = () => {
  const capacity = Number(capacityField.value);
  const rooms = Number(roomsField.value);
  if (capacity > rooms && capacity !== MIN_GUESTS && rooms !== MAX_ROOMS) {
    return `Гостей больше количества комнат на ${capacity - rooms}`;
  } else if (capacity === MIN_GUESTS && rooms !== MAX_ROOMS) {
    return `"не для гостей" - ${MAX_ROOMS} комнат`;
  } else if (rooms === MAX_ROOMS && capacity !== MIN_GUESTS) {
    return `${MAX_ROOMS} комнат - "не для гостей"`;
  }
};

const getRoomsErrorMessage = () => {
  const capacity = Number(capacityField.value);
  const rooms = Number(roomsField.value);
  if (capacity > rooms && capacity !== 0 && rooms !== MAX_ROOMS) {
    return `Количество комнат недостаточно для ${capacity} гостей`;
  } else if (capacity === MIN_GUESTS && rooms !== MAX_ROOMS) {
    return `"не для гостей" - ${MAX_ROOMS} комнат`;
  } else if (rooms === MAX_ROOMS && capacity !== MIN_GUESTS) {
    return `${MAX_ROOMS} комнат - "не для гостей"`;
  }
};

const validateTitle = (value) =>  value.length >= MIN_SYMBOLS && value.length <= MAX_SYMBOLS;

const validatePrice = (value) =>  value <= MAX_PRICE;

const validateRooms = () => roomsOption[roomsField.value].includes(capacityField.value);

const validatePriceField = () => minPrice[typeHousing.value] <= priceField.value;
const getPriceErrorMessage = () => `Не менее ${minPrice[typeHousing.value]} руб. за ночь`;

const pristine = createPristineInstance();

const addValidators = () => {
  pristine.addValidator(
    orderForm.querySelector('#title'),
    validateTitle,
    `От ${MIN_SYMBOLS} до ${MAX_SYMBOLS} символов`
  );


  pristine.addValidator(
    priceField,
    validatePrice,
    `Не более ${MAX_PRICE} руб.`
  );

  pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);
  pristine.addValidator(capacityField, validateRooms, getGuestsErrorMessage);
  pristine.addValidator(priceField, validatePriceField, getPriceErrorMessage);
};

const resetValidation = () => {
  priceField.placeholder = minPrice[typeHousing.value];
  priceField.value = minPrice[typeHousing.value];
  pristine.reset();
};

const onSuccessMessage = () => {
  showSuccessMessage();
  resetPage();
  unblockSubmitButton();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    blockSubmitButton();
    sendData(onSuccessMessage, showErrorMessage, formData);
  }
};

const setFormTime = (fromSelect, toSelect) => {
  toSelect.value = fromSelect.value;
};

const initValidation = () => {
  addValidators(pristine);

  let isPriceTouched = false;

  priceField.addEventListener('input', () => {
    isPriceTouched = true;
    sliderElement.noUiSlider.set(Number(priceField.value));
  });

  sliderElement.noUiSlider.on('slide', () => {
    isPriceTouched = true;
    priceField.value = sliderElement.noUiSlider.get();
    pristine.validate(priceField);
  });

  typeHousing.addEventListener('change', () => {
    if (!isPriceTouched) {
      priceField.placeholder = minPrice[typeHousing.value];
      priceField.value = minPrice[typeHousing.value];
      sliderElement.noUiSlider.set(minPrice[typeHousing.value]);
    }
    pristine.validate(priceField);
  });

  capacityField.addEventListener('change', () => {
    pristine.validate(roomsField);
  });

  roomsField.addEventListener('change', () => {
    pristine.validate(capacityField);
  });

  timeIn.addEventListener('change', () => {
    setFormTime(timeIn, timeOut);
  });

  timeOut.addEventListener('change', (evt) => {
    evt.preventDefault();
    setFormTime(timeOut, timeIn);
  });

  orderForm.addEventListener('submit', (evt) => onFormSubmit(evt));
};

export {initValidation, resetValidation};
