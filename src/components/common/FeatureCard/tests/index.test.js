import React from 'react';

import { render } from '@testing-library/react';

import FeatureCard from '..';

describe('<NavigationItem />', () => {
  it('Should render correctly', () => {
    const { container } = render(<FeatureCard href="/test" />);

    expect(container).toMatchSnapshot();
  });
  it('Should render with nextified href', () => {
    const { container } = render(<FeatureCard href="/blog/test" />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with custom className', () => {
    const { container } = render(<FeatureCard href="/test" className={'test-custom-classname'} />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly hrefExternal', () => {
    const { container } = render(<FeatureCard href="https://duckduckgo.com/" />);

    expect(container).toMatchSnapshot();
  });
});
