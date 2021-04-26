import React from 'react';
import { render } from '@testing-library/react';

import Home from '../Container';

describe('<Home />', () => {
  it('should render correctly', () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
