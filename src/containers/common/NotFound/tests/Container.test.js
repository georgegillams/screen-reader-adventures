import React from 'react';
import { render } from '@testing-library/react';

import NotFound from '../Container';

describe('<NotFound />', () => {
  it('should render correctly', () => {
    const { container } = render(<NotFound />);

    expect(container).toMatchSnapshot();
  });
});
