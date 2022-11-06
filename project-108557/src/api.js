import axios from 'axios';

const URL = `https://6.react.pages.academy/six-cities`;
const TIMEOUT = 5000;
const WITH_CREDENTIALS = true;

const HttpCode = {
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
    withCredentials: WITH_CREDENTIALS
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
