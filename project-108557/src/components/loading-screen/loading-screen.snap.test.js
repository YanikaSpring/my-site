import React from 'react';
import {render} from '@testing-library/react';

import LoadingScreen from './loading-screen';

it(`'LoadingScreen component' should render correctly`, () => {
  const {container} = render(<LoadingScreen />);

  expect(container).toMatchSnapshot();
});
