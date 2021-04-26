import React from 'react';
import { render } from '@testing-library/react';

import { AdminOnly } from '..';

describe('<AdminOnly />', () => {
  it('Should render correctly', () => {
    const { container } = render(<AdminOnly user={null}>Test</AdminOnly>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with user', () => {
    const { container } = render(<AdminOnly user={{}}>Test</AdminOnly>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with admin user', () => {
    const { container } = render(<AdminOnly user={{ admin: true }}>Test</AdminOnly>);

    expect(container).toMatchSnapshot();
  });
});
