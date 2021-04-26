import React from 'react';

import { render } from '@testing-library/react';

import Button from '..';

describe('<Button />', () => {
  it('Should render correctly', () => {
    const { container } = render(<Button href="/test" />);

    expect(container).toMatchSnapshot();
  });
  it('Should render with nextified href', () => {
    const { container } = render(<Button href="/blog/test" />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with custom className', () => {
    const { container } = render(<Button href="/test" className={'test-custom-classname'} />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly hrefExternal', () => {
    const { container } = render(<Button href="https://duckduckgo.com/" hrefExternal />);

    expect(container).toMatchSnapshot();
  });
});
