import React from 'react';
import { render } from '@testing-library/react';

import SiteMap from '../Container';

describe('<SiteMap />', () => {
  it('should render correctly', () => {
    const { container } = render(<SiteMap />);

    expect(container).toMatchSnapshot();
  });
});
