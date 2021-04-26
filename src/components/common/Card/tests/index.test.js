import React from 'react';

import { render } from '@testing-library/react';

import Card from '..';

describe('<Card />', () => {
  it('Should render correctly', () => {
    const { container } = render(<Card href="/test" />);

    expect(container).toMatchSnapshot();
  });
  it('Should render with nextified href', () => {
    const { container } = render(<Card href="/blog/test" />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with custom className', () => {
    const { container } = render(<Card href="/test" className={'test-custom-classname'} />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly hrefExternal', () => {
    const { container } = render(<Card href="https://duckduckgo.com/" />);

    expect(container).toMatchSnapshot();
  });
});
