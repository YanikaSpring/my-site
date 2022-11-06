import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter as BrowserRouter} from 'react-router-dom';
import App from './components/app/app';
import store from './store/store';
import {checkAuth} from './store/user/operations';

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`)
);
