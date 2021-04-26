import React from 'react';
import { render } from '@testing-library/react';

import Debug from '../Container';

describe('<Debug />', () => {
  it('should render correctly', () => {
    const { container } = render(<Debug />);

    expect(container).toMatchSnapshot();
  });
});
