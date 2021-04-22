import React from 'react';
import { render } from '@testing-library/react';

import { LoggedOutOnly } from '..';

describe('<LoggedOutOnly />', () => {
  it('Should render correctly', () => {
    const { container } = render(<LoggedOutOnly user={null}>Test</LoggedOutOnly>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with user', () => {
    const { container } = render(<LoggedOutOnly user={{}}>Test</LoggedOutOnly>);

    expect(container).toMatchSnapshot();
  });
});
