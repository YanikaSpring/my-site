const sliderElement = document.querySelector('.ad-form__slider');

const MIN_VALUE = 0;
const MAX_VALUE = 100000;
const START_VALUE = 1000;
const STEP_SLIDER = 1;


const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_VALUE,
      max: MAX_VALUE,
    },
    start: START_VALUE,
    step: STEP_SLIDER,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(0);
      },
      from: (value) =>  parseFloat(value),
    },
  });
};

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

export {createSlider, resetSlider};
