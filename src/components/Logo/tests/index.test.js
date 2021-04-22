import React from 'react';

import { render } from '@testing-library/react';

import Logo from '..';

describe('<Logo />', () => {
  it('Should render correctly', () => {
    const { container } = render(<Logo></Logo>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with custom className', () => {
    const { container } = render(<Logo className={'test-custom-classname'}></Logo>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly pride', () => {
    const { container } = render(<Logo pride></Logo>);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly animated', () => {
    const { container } = render(<Logo animated></Logo>);

    expect(container).toMatchSnapshot();
  });
});
