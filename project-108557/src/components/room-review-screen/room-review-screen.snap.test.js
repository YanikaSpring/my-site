import React from 'react';
import {render} from '@testing-library/react';

import Review from './room-review-screen';
import {commentMocks} from '../../store/tests.mocks';

it(`'Review component' should render correctly`, () => {
  const {container} = render(<Review reviewData={commentMocks} />);

  expect(container).toMatchSnapshot();
});
