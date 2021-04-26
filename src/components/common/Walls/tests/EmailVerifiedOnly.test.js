import React from 'react';
import { render } from '@testing-library/react';

import { EmailVerifiedOnly } from '..';

describe('<EmailVerifiedOnly />', () => {
  it('Should render correctly', () => {
    const { container } = render(<EmailVerifiedOnly user={null}>Test</EmailVerifiedOnly>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with user', () => {
    const { container } = render(<EmailVerifiedOnly user={{}}>Test</EmailVerifiedOnly>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with user with verified email', () => {
    const { container } = render(<EmailVerifiedOnly user={{ emailVerified: true }}>Test</EmailVerifiedOnly>);

    expect(container).toMatchSnapshot();
  });
});
