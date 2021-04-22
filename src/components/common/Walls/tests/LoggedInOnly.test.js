import React from 'react';
import { render } from '@testing-library/react';

import { LoggedInOnly } from '..';

describe('<LoggedInOnly />', () => {
  it('Should render correctly', () => {
    const { container } = render(<LoggedInOnly user={null}>Test</LoggedInOnly>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with user', () => {
    const { container } = render(<LoggedInOnly user={{}}>Test</LoggedInOnly>);

    expect(container).toMatchSnapshot();
  });
});
