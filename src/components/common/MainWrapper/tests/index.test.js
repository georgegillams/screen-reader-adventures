import React from 'react';

import { render } from '@testing-library/react';

import MainWrapper from '..';

describe('<MainWrapper />', () => {
  const children = <div>some text</div>;

  it('Should render correctly', () => {
    const { container } = render(<MainWrapper>{children}</MainWrapper>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(<MainWrapper className={'test-custom-classname'}>{children}</MainWrapper>);

    expect(container).toMatchSnapshot();
  });
});
