import React from 'react';

import { render } from '@testing-library/react';

import AppWrapper from '..';

describe('<AppWrapper />', () => {
  const children = <div>some text</div>;

  it('Should render correctly', () => {
    const { container } = render(<AppWrapper>{children}</AppWrapper>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(<AppWrapper className={'test-custom-classname'}>{children}</AppWrapper>);

    expect(container).toMatchSnapshot();
  });
});
