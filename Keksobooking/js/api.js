const API_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .catch(() => onFail());
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body,
    },
  ).then(() => {
    onSuccess();
  }).catch(() => {
    onFail();
  });
};

export {getData, sendData};
