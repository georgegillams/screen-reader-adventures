import React from 'react';
import { render } from '@testing-library/react';

import Teapot from '../Container';

describe('<Teapot />', () => {
  it('should render correctly', () => {
    const { container } = render(<Teapot />);

    expect(container).toMatchSnapshot();
  });
});
