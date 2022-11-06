import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

import NotFoundScreen from './not-found-screen';

it(`'NotFoundScreen component' should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>
  );

  expect(container).toMatchSnapshot();
});
